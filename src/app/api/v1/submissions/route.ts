import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: { message: 'Database connection unavailable' } },
      { status: 500 }
    );
  }

  try {
    const studentId = '00000000-0000-0000-0000-000000000001'; // Meera Patel
    const subRes = await pool.query(
      `SELECT 
         s.id,
         s.student_id,
         s.challenge_id,
         s.current_revision,
         s.status,
         sr.id AS revision_id,
         sr.revision_no,
         sr.title,
         sr.submitted_at,
         c.title AS challenge_title,
         (
           SELECT json_build_object(
             'id', r.id,
             'reviewer_name', rp.display_name,
             'published_at', r.published_at,
             'level', (SELECT rs.level FROM review_scores rs WHERE rs.review_id = r.id LIMIT 1)
           )
           FROM reviews r
           JOIN profiles rp ON rp.id = r.reviewer_id
           WHERE r.revision_id = sr.id
           ORDER BY r.published_at DESC
           LIMIT 1
         ) AS review
       FROM submissions s
       JOIN submission_revisions sr ON sr.submission_id = s.id AND sr.revision_no = s.current_revision
       JOIN challenges c ON c.id = s.challenge_id
       WHERE s.student_id = $1
       ORDER BY sr.submitted_at DESC;`,
      [studentId]
    );

    return NextResponse.json(
      {
        data: subRes.rows,
        meta: {
          total: subRes.rows.length,
          timestamp: new Date().toISOString(),
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err) {
    console.error('Error fetching submissions catalog:', err);
    return NextResponse.json(
      { error: { message: (err as Error).message } },
      { status: 500 }
    );
  }
}
