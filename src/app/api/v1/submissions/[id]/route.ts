import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const paramId = params.id;
  const ID_MAP: Record<string, string> = {
    'sub-sql-001': '80000000-0000-0000-0000-000000000001',
    'sub-sheet-001': '80000000-0000-0000-0000-000000000002',
    'sub-comm-001': '80000000-0000-0000-0000-000000000003',
  };
  const canonicalSubmissionId = ID_MAP[paramId] || paramId;

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: { message: 'Database connection unavailable' } },
      { status: 500 }
    );
  }

  try {
    const subRes = await pool.query(
      `SELECT 
         s.id,
         s.student_id,
         s.challenge_id,
         s.current_revision,
         s.status,
         s.version,
         s.created_at,
         s.updated_at,
         sr.id AS revision_id,
         sr.revision_no,
         sr.title,
         sr.body,
         sr.contribution,
         sr.submitted_at,
         c.title AS challenge_title,
         c.brief AS challenge_brief,
         p.display_name AS student_name
       FROM submissions s
       JOIN submission_revisions sr ON sr.submission_id = s.id AND sr.revision_no = s.current_revision
       JOIN challenges c ON c.id = s.challenge_id
       JOIN profiles p ON p.id = s.student_id
       WHERE s.id = $1;`,
      [canonicalSubmissionId]
    );

    if (subRes.rows.length === 0) {
      return NextResponse.json(
        { error: { message: `Submission ${paramId} not found in database` } },
        { status: 404 }
      );
    }

    const row = subRes.rows[0];

    // Check for review
    const revRes = await pool.query(
      `SELECT 
         r.id AS review_id,
         r.reviewer_id,
         r.published_at,
         r.status AS review_status,
         rp.display_name AS reviewer_name,
         (
           SELECT json_agg(json_build_object(
             'criterion_id', rs.criterion_id,
             'level', rs.level,
             'rationale', rs.rationale
           ))
           FROM review_scores rs
           WHERE rs.review_id = r.id
         ) AS scores
       FROM reviews r
       JOIN profiles rp ON rp.id = r.reviewer_id
       WHERE r.revision_id = $1
       ORDER BY r.published_at DESC
       LIMIT 1;`,
      [row.revision_id]
    );

    // Fetch external links
    const linkRes = await pool.query(
      `SELECT url, label FROM evidence_links WHERE revision_id = $1;`,
      [row.revision_id]
    );

    const review = revRes.rows.length > 0 ? revRes.rows[0] : null;

    return NextResponse.json(
      {
        data: {
          id: row.id,
          student_id: row.student_id,
          student_name: row.student_name,
          challenge_id: row.challenge_id,
          challenge_title: row.challenge_title,
          challenge_brief: row.challenge_brief,
          current_revision: row.current_revision,
          status: row.status,
          title: row.title,
          body: row.body,
          contribution: row.contribution,
          submitted_at: row.submitted_at,
          external_links: linkRes.rows.map((l: any) => l.url),
          review: review
            ? {
                id: review.review_id,
                reviewer_id: review.reviewer_id,
                reviewer_name: review.reviewer_name,
                published_at: review.published_at,
                scores: review.scores || [],
              }
            : null,
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
  } catch (err) {
    console.error('Error fetching submission details:', err);
    return NextResponse.json(
      { error: { message: (err as Error).message } },
      { status: 500 }
    );
  }
}
