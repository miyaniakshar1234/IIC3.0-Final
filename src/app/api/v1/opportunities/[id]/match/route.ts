import { NextRequest, NextResponse } from 'next/server';
import { calculateCoverage, RequiredSkill, StudentAttainment } from '@/lib/matching';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const opportunityId = params.id;
  const { searchParams } = new URL(request.url);

  // In demo mode or if student_id is passed, evaluate for that student
  // Default to Meera ('00000000-0000-0000-0000-000000000001')
  const studentId = searchParams.get('student_id') || '00000000-0000-0000-0000-000000000001';
  const includeSqlReview = searchParams.get('include_sql_review') === 'true';

  // Demo opportunity skills from 11_SKILL_MAPPING_AND_AI.md & seed.sql
  const requiredSkills: RequiredSkill[] = [
    { skillId: '30000000-0000-0000-0000-000000000001', skillName: 'SQL', requiredLevel: 3, weight: 35 },
    { skillId: '30000000-0000-0000-0000-000000000002', skillName: 'Spreadsheets', requiredLevel: 3, weight: 25 },
    { skillId: '30000000-0000-0000-0000-000000000003', skillName: 'Written Communication', requiredLevel: 4, weight: 16 },
    { skillId: '30000000-0000-0000-0000-000000000004', skillName: 'Analytical Reasoning', requiredLevel: 3, weight: 24 },
  ];

  // Baseline attainments for Meera (Spreadsheets L3, Comm L3, Reasoning L3)
  const studentAttainments: StudentAttainment[] = [
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
  ];

  // If reviewer has published SQL review at Level 3
  if (includeSqlReview) {
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

  return NextResponse.json({
    data: {
      ...matchResult,
      student_id: studentId,
      opportunity_title: 'Junior Data Analyst Intern',
      employer_name: 'Sample Analytics Studio',
    },
    meta: {
      request_id: crypto.randomUUID(),
    },
  });
}
