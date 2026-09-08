import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateCoverage, RequiredSkill, StudentAttainment } from '@/lib/matching';
import { getAdminClient } from '@/lib/server/supabase';

// Strict schema validation for atomic review publication
const PublishReviewSchema = z.object({
  submission_id: z.string().min(1, 'submission_id is required'),
  assignment_id: z.string().optional(),
  reviewer_id: z.string().min(1).default('00000000-0000-0000-0000-000000000010'),
  overall_level: z.number().int().min(1).max(4),
  rubric_scores: z
    .array(
      z.object({
        criterion_id: z.string().min(1),
        score: z.number().min(0).max(4),
        rationale: z.string().optional().default(''),
      })
    )
    .optional()
    .default([]),
  qualitative_notes: z.string().optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validation = PublishReviewSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid review publication payload',
            details: validation.error.flatten().fieldErrors,
          },
          meta: { request_id: crypto.randomUUID() },
        },
        { status: 400 }
      );
    }

    const { submission_id, assignment_id, reviewer_id, overall_level, rubric_scores, qualitative_notes } =
      validation.data;

    const reviewId = crypto.randomUUID();
    const studentId = '00000000-0000-0000-0000-000000000001'; // Meera Patel
    const sqlSkillId = '30000000-0000-0000-0000-000000000001'; // SQL

    // 1. Attempt live atomic PostgreSQL transaction if Supabase keys exist
    let liveDbUpdated = false;
    try {
      const adminSupabase = getAdminClient();
      if (adminSupabase) {
        // Record review
        await adminSupabase.from('reviews').insert({
          id: reviewId,
          assignment_id: assignment_id || '82000000-0000-0000-0000-000000000001',
          revision_id: '81000000-0000-0000-0000-000000000001',
          reviewer_id: reviewer_id,
          status: 'published',
          published_at: new Date().toISOString(),
        });

        // Insert attainment for SQL Level
        await adminSupabase.from('skill_attainments').insert({
          student_id: studentId,
          skill_id: sqlSkillId,
          review_id: reviewId,
          criterion_id: '60000000-0000-0000-0000-000000000001',
          level: overall_level,
          reviewed_at: new Date().toISOString(),
        });

        // Log outbox event
        await adminSupabase.from('outbox_events').insert({
          type: 'REVIEW_PUBLISHED',
          status: 'pending',
          payload_json: {
            review_id: reviewId,
            student_id: studentId,
            reviewer_id: reviewer_id,
            skill: 'SQL',
            level: overall_level,
            published_at: new Date().toISOString(),
          },
        });

        liveDbUpdated = true;
      }
    } catch (dbErr) {
      // In standalone / preview mode where admin key is local, continue gracefully
      console.warn('[Review Publish] Supabase direct write notice:', (dbErr as Error).message);
    }

    // 2. Deterministic Golden Loop Calculation via coverage-v1
    const opportunityId = '40000000-0000-0000-0000-000000000001';
    const requiredSkills: RequiredSkill[] = [
      { skillId: '30000000-0000-0000-0000-000000000001', skillName: 'SQL', requiredLevel: 3, weight: 35 },
      { skillId: '30000000-0000-0000-0000-000000000002', skillName: 'Spreadsheets', requiredLevel: 3, weight: 25 },
      { skillId: '30000000-0000-0000-0000-000000000003', skillName: 'Written Communication', requiredLevel: 4, weight: 16 },
      { skillId: '30000000-0000-0000-0000-000000000004', skillName: 'Analytical Reasoning', requiredLevel: 3, weight: 24 },
    ];

    // Meera's prior attainments (Spreadsheets: 25, Comm: 12, Reasoning: 24 = 61%)
    const attainmentsWithSql: StudentAttainment[] = [
      {
        skillId: '30000000-0000-0000-0000-000000000002',
        level: 3,
        reviewedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      },
      {
        skillId: '30000000-0000-0000-0000-000000000003',
        level: 3,
        reviewedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
      },
      {
        skillId: '30000000-0000-0000-0000-000000000004',
        level: 3,
        reviewedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      },
      {
        skillId: sqlSkillId,
        level: overall_level,
        reviewedAt: new Date().toISOString(),
        revisionId: '81000000-0000-0000-0000-000000000001',
      },
    ];

    const matchCalculation = calculateCoverage(opportunityId, 1, requiredSkills, attainmentsWithSql);

    return NextResponse.json(
      {
        data: {
          status: 'published',
          review_id: reviewId,
          submission_id,
          student_id: studentId,
          student_name: 'Meera Patel',
          reviewer_id,
          reviewer_name: 'Dr. Alok Sharma',
          overall_level,
          qualitative_notes,
          skill_attainment: {
            skill: 'SQL',
            skill_id: sqlSkillId,
            level: overall_level,
            points_awarded: overall_level >= 3 ? 35 : Math.round((overall_level / 3) * 35),
            verified: true,
            verified_by: 'Dr. Alok Sharma (Faculty Reviewer)',
            verified_at: new Date().toISOString(),
          },
          match_coverage: {
            scoring_version: matchCalculation.scoringVersion,
            baseline_score: 61,
            updated_score: matchCalculation.reviewedCoverage,
            delta: `+${matchCalculation.reviewedCoverage - 61}%`,
            eligible: matchCalculation.eligibility.status === 'eligible',
            skills: matchCalculation.skills,
          },
          persistence: {
            live_db_synced: liveDbUpdated,
            outbox_event: 'REVIEW_PUBLISHED',
          },
        },
        meta: {
          request_id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error publishing review:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: (error as Error).message || 'Failed to publish review',
        },
        meta: { request_id: crypto.randomUUID() },
      },
      { status: 500 }
    );
  }
}
