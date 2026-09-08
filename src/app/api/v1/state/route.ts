import { NextRequest, NextResponse } from 'next/server';
import { calculateCoverage, RequiredSkill, StudentAttainment } from '@/lib/matching';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const studentId = '00000000-0000-0000-0000-000000000001'; // Meera Patel
  const sqlSkillId = '30000000-0000-0000-0000-000000000001';
  const submissionId = '80000000-0000-0000-0000-000000000001';
  const opportunityId = '40000000-0000-0000-0000-000000000001';

  let hasVerifiedSql = false;
  let sqlLevel = 0;
  let sqlReviewedAt: string | null = null;
  let submissionStatus: 'submitted' | 'reviewed' = 'submitted';
  let assignmentStatus: 'assigned' | 'completed' = 'assigned';
  let reviewDetails: {
    id: string;
    published_at: string;
    reviewer_name: string;
    reviewer_id: string;
  } | null = null;

  let dbAttainments: StudentAttainment[] = [];

  const pool = getDbPool();
  if (pool) {
    try {
      // 1. Check submission status
      const subRes = await pool.query(
        `SELECT status FROM submissions WHERE id = $1;`,
        [submissionId]
      );
      if (subRes.rows.length > 0) {
        submissionStatus = subRes.rows[0].status as 'submitted' | 'reviewed';
      }

      // 2. Check reviewer assignment status
      const assignRes = await pool.query(
        `SELECT id, status, reviewer_id FROM reviewer_assignments 
         WHERE revision_id = '81000000-0000-0000-0000-000000000001' OR id = '82000000-0000-0000-0000-000000000001'
         LIMIT 1;`
      );
      if (assignRes.rows.length > 0) {
        assignmentStatus = assignRes.rows[0].status as 'assigned' | 'completed';
      }

      // 3. Query all active attainments for Meera from database
      const attRes = await pool.query(
        `SELECT skill_id, level, reviewed_at, review_id
         FROM skill_attainments 
         WHERE student_id = $1
         ORDER BY reviewed_at DESC;`,
        [studentId]
      );

      if (attRes.rows.length > 0) {
        dbAttainments = attRes.rows.map((r) => ({
          skillId: r.skill_id,
          level: Number(r.level),
          reviewedAt: new Date(r.reviewed_at).toISOString(),
        }));

        const sqlAtt = attRes.rows.find((r) => r.skill_id === sqlSkillId);
        if (sqlAtt && Number(sqlAtt.level) > 0) {
          hasVerifiedSql = true;
          sqlLevel = Number(sqlAtt.level);
          sqlReviewedAt = new Date(sqlAtt.reviewed_at).toISOString();
        }
      }

      // 4. Check review record
      const revRes = await pool.query(
        `SELECT r.id, r.published_at, r.reviewer_id, p.display_name AS reviewer_name
         FROM reviews r
         JOIN profiles p ON p.id = r.reviewer_id
         WHERE r.revision_id = '81000000-0000-0000-0000-000000000001'
            OR r.assignment_id = '82000000-0000-0000-0000-000000000001'
         ORDER BY r.published_at DESC LIMIT 1;`
      );
      if (revRes.rows.length > 0) {
        reviewDetails = {
          id: revRes.rows[0].id,
          published_at: new Date(revRes.rows[0].published_at).toISOString(),
          reviewer_name: revRes.rows[0].reviewer_name,
          reviewer_id: revRes.rows[0].reviewer_id,
        };
      }
    } catch (err) {
      console.warn('[ProofBridge State API] Database read notice:', (err as Error).message);
    }
  }

  // Ensure baseline attainments exist (Spreadsheets 25, Comm 12, Reasoning 24 = 61%)
  const verifiedAttainments: StudentAttainment[] = [...dbAttainments];
  if (!verifiedAttainments.some((a) => a.skillId === '30000000-0000-0000-0000-000000000002')) {
    verifiedAttainments.push({
      skillId: '30000000-0000-0000-0000-000000000002',
      level: 3,
      reviewedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    });
  }
  if (!verifiedAttainments.some((a) => a.skillId === '30000000-0000-0000-0000-000000000003')) {
    verifiedAttainments.push({
      skillId: '30000000-0000-0000-0000-000000000003',
      level: 3,
      reviewedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    });
  }
  if (!verifiedAttainments.some((a) => a.skillId === '30000000-0000-0000-0000-000000000004')) {
    verifiedAttainments.push({
      skillId: '30000000-0000-0000-0000-000000000004',
      level: 3,
      reviewedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    });
  }

  // Calculate coverage
  const requiredSkills: RequiredSkill[] = [
    { skillId: '30000000-0000-0000-0000-000000000001', skillName: 'SQL', requiredLevel: 3, weight: 35 },
    { skillId: '30000000-0000-0000-0000-000000000002', skillName: 'Spreadsheets', requiredLevel: 3, weight: 25 },
    { skillId: '30000000-0000-0000-0000-000000000003', skillName: 'Written Communication', requiredLevel: 4, weight: 16 },
    { skillId: '30000000-0000-0000-0000-000000000004', skillName: 'Analytical Reasoning', requiredLevel: 3, weight: 24 },
  ];

  const matchResult = calculateCoverage(opportunityId, 1, requiredSkills, verifiedAttainments);
  const currentCoverage = matchResult.reviewedCoverage; // 61 when SQL missing, 96 when SQL present

  return NextResponse.json(
    {
      data: {
        student_id: studentId,
        student_name: 'Meera Patel',
        has_verified_sql: hasVerifiedSql,
        sql_level: sqlLevel,
        sql_reviewed_at: sqlReviewedAt,
        submission_id: submissionId,
        submission_status: submissionStatus,
        assignment_status: assignmentStatus,
        review_details: reviewDetails,
        match_coverage: {
          scoring_version: 'coverage-v1',
          baseline_score: 61,
          reviewed_coverage: currentCoverage,
          potential_coverage: 96,
          delta: hasVerifiedSql ? '+35%' : '0%',
          eligible: matchResult.eligibility.status === 'eligible',
          skills: matchResult.skills,
        },
        institution_metrics: {
          cohort: 'MCA 2026',
          sql_students_deficient: hasVerifiedSql ? 41 : 42,
          sql_deficit_pct: hasVerifiedSql ? -41 : -42,
          sql_cohort_avg: hasVerifiedSql ? 1.83 : 1.80,
          verified_attainments_total: hasVerifiedSql ? 249 : 248,
        },
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
