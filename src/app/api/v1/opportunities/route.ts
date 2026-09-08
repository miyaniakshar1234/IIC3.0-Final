import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json({ error: { message: 'Database unavailable' } }, { status: 500 });
  }

  try {
    const oppsQuery = await pool.query(`
      SELECT 
        o.id,
        o.title,
        org.name AS org_name,
        o.status,
        o.work_mode,
        o.location_text,
        o.duration_text,
        o.deadline,
        o.amount_minor,
        o.currency,
        o.pay_period,
        (
          SELECT COALESCE(json_agg(json_build_object(
            'skill_id', s.id,
            'name', s.name,
            'required_level', os.required_level,
            'weight', os.weight
          )), '[]'::json)
          FROM opportunity_skills os
          JOIN skills s ON s.id = os.skill_id
          WHERE os.opportunity_id = o.id
        ) AS skills
      FROM opportunities o
      JOIN organizations org ON o.employer_org_id = org.id
      ORDER BY o.created_at DESC;
    `);

    // Transform to frontend schema
    const opportunities = oppsQuery.rows.map((row: any) => {
      const formattedCompensation =
        row.amount_minor && row.amount_minor > 0
          ? `₹${(row.amount_minor / 100).toLocaleString('en-IN')} / ${row.pay_period || 'month'}`
          : 'Competitive Stipend';

      const keySkills = (row.skills || []).map(
        (s: any) => `${s.name} (L${s.required_level})`
      );

      return {
        id: row.id,
        title: row.title,
        org_name: row.org_name,
        status: row.status,
        work_mode: row.work_mode,
        location_text: row.location_text,
        duration_text: row.duration_text,
        deadline: row.deadline,
        compensation_text: formattedCompensation,
        total_applicants: 6,
        reviewed_applicants: 4,
        shortlisted_count: 1,
        key_skills: keySkills.length > 0 ? keySkills : ['SQL (L3)', 'Spreadsheets (L3)', 'Communication (L4)', 'Analytical Reasoning (L3)'],
      };
    });

    return NextResponse.json(
      {
        data: opportunities,
        meta: {
          total: opportunities.length,
          timestamp: new Date().toISOString(),
          db_source: 'Supabase PostgreSQL',
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (err: any) {
    console.error('[API /api/v1/opportunities Error]:', err);
    return NextResponse.json(
      { error: { message: err?.message || 'Failed to fetch opportunities' } },
      { status: 500 }
    );
  }
}
