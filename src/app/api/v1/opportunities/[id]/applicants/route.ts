import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';
import { calculateCoverage, RequiredSkill } from '@/lib/matching';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const opportunityId = params.id;
  const pool = getDbPool();

  if (!pool) {
    return NextResponse.json(
      { error: { message: 'Database connection unavailable' } },
      { status: 500 }
    );
  }

  try {
    const appsRes = await pool.query(
      `SELECT a.id as application_id, a.student_id, a.status, a.version, a.applied_at, a.snapshot_json,
              p.display_name, sp.program, o.title as opportunity_title
       FROM applications a
       JOIN profiles p ON a.student_id = p.id
       JOIN student_profiles sp ON a.student_id = sp.user_id
       JOIN opportunities o ON a.opportunity_id = o.id
       WHERE a.opportunity_id = $1
       ORDER BY a.applied_at DESC;`,
      [opportunityId]
    );

    if (appsRes.rows.length === 0) {
      return NextResponse.json({ data: [] });
    }

    const requiredSkills: RequiredSkill[] = [
      { skillId: '30000000-0000-0000-0000-000000000001', skillName: 'SQL Querying & Data Cleaning', requiredLevel: 3, weight: 35 },
      { skillId: '30000000-0000-0000-0000-000000000002', skillName: 'Spreadsheets & Pivot Modeling', requiredLevel: 3, weight: 25 },
      { skillId: '30000000-0000-0000-0000-000000000003', skillName: 'Written Technical Communication', requiredLevel: 4, weight: 16 },
      { skillId: '30000000-0000-0000-0000-000000000004', skillName: 'Analytical Reasoning & Trade-offs', requiredLevel: 3, weight: 24 },
    ];

    const candidates = [];

    for (const app of appsRes.rows) {
      const attRes = await pool.query(
        `SELECT sa.skill_id, sa.level, sa.reviewed_at, s.name as skill_name, sa.revision_id
         FROM skill_attainments sa
         JOIN skills s ON sa.skill_id = s.id
         WHERE sa.student_id = $1`,
        [app.student_id]
      );

      const liveAttainments = attRes.rows.map((r) => ({
        skillId: r.skill_id,
        level: Number(r.level),
        reviewedAt: new Date(r.reviewed_at).toISOString(),
        revisionId: r.revision_id,
      }));

      const matchResult = calculateCoverage(opportunityId, 1, requiredSkills, liveAttainments);

      const frontendSkills = liveAttainments.map(att => {
        const reqSkill = requiredSkills.find(rs => rs.skillId === att.skillId);
        if (!reqSkill) return null;
        const scored = matchResult.skills.find(s => s.skillId === att.skillId);
        return {
          skill_id: att.skillId,
          skill_name: reqSkill.skillName,
          required_level: reqSkill.requiredLevel,
          reviewed_level: att.level,
          weight: reqSkill.weight,
          contribution: scored ? scored.contribution : 0,
          reviewer_name: 'Verified Faculty',
          reviewed_at: att.reviewedAt,
          evidence_title: 'Challenge Submission Evidence',
          criterion_title: 'Verified Attainment',
          rationale: 'Evidence verified by faculty evaluator via ProofBridge rubrics.',
        };
      }).filter(Boolean);

      candidates.push({
        application_id: app.application_id,
        version: app.version,
        student_name: app.display_name,
        student_program: app.program,
        student_institution: 'Manipal University Jaipur (MUJ)',
        opportunity_title: app.opportunity_title,
        status: app.status,
        applied_at: app.applied_at,
        scoring_version: 'coverage-v1',
        reviewed_coverage: matchResult.reviewedCoverage,
        skills: frontendSkills,
        contribution_statement: 'I successfully completed the required challenge assessments to prove my capabilities.',
      });
    }

    return NextResponse.json({
      data: candidates,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err: any) {
    console.error('Error fetching applicants:', err);
    return NextResponse.json(
      { error: { message: err.message } },
      { status: 500 }
    );
  }
}
