import { NextRequest, NextResponse } from 'next/server';
import { calculateCoverage, RequiredSkill, StudentAttainment } from '@/lib/matching';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const opportunityId = params.id;
  const { searchParams } = new URL(request.url);

  // Default to Meera ('00000000-0000-0000-0000-000000000001')
  const studentId = searchParams.get('student_id') || '00000000-0000-0000-0000-000000000001';
  const queryOverride = searchParams.get('include_sql_review');

  const requiredSkills: RequiredSkill[] = [
    { skillId: '30000000-0000-0000-0000-000000000001', skillName: 'SQL', requiredLevel: 3, weight: 35 },
    { skillId: '30000000-0000-0000-0000-000000000002', skillName: 'Spreadsheets', requiredLevel: 3, weight: 25 },
    { skillId: '30000000-0000-0000-0000-000000000003', skillName: 'Written Communication', requiredLevel: 4, weight: 16 },
    { skillId: '30000000-0000-0000-0000-000000000004', skillName: 'Analytical Reasoning', requiredLevel: 3, weight: 24 },
  ];

  // Read actual live attainments from Supabase PostgreSQL
  let liveAttainments: StudentAttainment[] = [];
  let hasLiveSql = false;

  const pool = getDbPool();
  if (pool) {
    try {
      const attRes = await pool.query(
        `SELECT skill_id, level, reviewed_at 
         FROM skill_attainments 
         WHERE student_id = $1 
         ORDER BY reviewed_at DESC;`,
        [studentId]
      );

      if (attRes.rows.length > 0) {
        liveAttainments = attRes.rows.map((r) => ({
          skillId: r.skill_id,
          level: Number(r.level),
          reviewedAt: new Date(r.reviewed_at).toISOString(),
        }));

        hasLiveSql = attRes.rows.some(
          (r) => r.skill_id === '30000000-0000-0000-0000-000000000001' && Number(r.level) > 0
        );
      }
    } catch (err) {
      console.warn('[Match API] Database query notice:', (err as Error).message);
    }
  }

  // Ensure baseline attainments are present
  const studentAttainments: StudentAttainment[] = [...liveAttainments];
  if (!studentAttainments.some((a) => a.skillId === '30000000-0000-0000-0000-000000000002')) {
    studentAttainments.push({
      skillId: '30000000-0000-0000-0000-000000000002',
      level: 3,
      reviewedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    });
  }
  if (!studentAttainments.some((a) => a.skillId === '30000000-0000-0000-0000-000000000003')) {
    studentAttainments.push({
      skillId: '30000000-0000-0000-0000-000000000003',
      level: 3,
      reviewedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    });
  }
  if (!studentAttainments.some((a) => a.skillId === '30000000-0000-0000-0000-000000000004')) {
    studentAttainments.push({
      skillId: '30000000-0000-0000-0000-000000000004',
      level: 3,
      reviewedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    });
  }

  // Allow query param override if explicitly passed, else adhere to live DB truth
  const shouldIncludeSql = queryOverride !== null ? queryOverride === 'true' : hasLiveSql;

  if (shouldIncludeSql && !studentAttainments.some((a) => a.skillId === '30000000-0000-0000-0000-000000000001')) {
    studentAttainments.push({
      skillId: '30000000-0000-0000-0000-000000000001',
      level: 3,
      reviewedAt: new Date().toISOString(),
      revisionId: '81000000-0000-0000-0000-000000000001',
    });
  }

  const matchResult = calculateCoverage(
    opportunityId,
    1,
    requiredSkills,
    studentAttainments
  );

  return NextResponse.json(
    {
      data: {
        ...matchResult,
        student_id: studentId,
        opportunity_title: 'Junior Data Analyst Intern',
        employer_name: 'Sample Analytics Studio',
        has_verified_sql: shouldIncludeSql,
      },
      meta: {
        request_id: crypto.randomUUID(),
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
