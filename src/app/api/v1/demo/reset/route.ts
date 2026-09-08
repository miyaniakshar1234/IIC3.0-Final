import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: { code: 'DB_UNAVAILABLE', message: 'PostgreSQL connection pool unavailable' } },
      { status: 500 }
    );
  }
  const client = await pool.connect();
  const startTime = Date.now();

  try {
    await client.query('BEGIN');

    // 1. Delete SQL skill attainment for Meera (restoring 61% baseline)
    const delAttainments = await client.query(`
      DELETE FROM skill_attainments 
      WHERE student_id = '00000000-0000-0000-0000-000000000001' 
        AND skill_id = '30000000-0000-0000-0000-000000000001';
    `);

    // 2. Delete review scores for Meera's SQL challenge review
    const delScores = await client.query(`
      DELETE FROM review_scores
      WHERE review_id IN (
        SELECT id FROM reviews 
        WHERE revision_id = '81000000-0000-0000-0000-000000000001'
           OR assignment_id = '82000000-0000-0000-0000-000000000001'
      );
    `);

    // 3. Delete reviews for Meera's SQL challenge
    const delReviews = await client.query(`
      DELETE FROM reviews
      WHERE revision_id = '81000000-0000-0000-0000-000000000001'
         OR assignment_id = '82000000-0000-0000-0000-000000000001';
    `);

    // 4. Reset submission status back to 'submitted'
    const resetSubmission = await client.query(`
      UPDATE submissions
      SET status = 'submitted',
          updated_at = NOW()
      WHERE id = '80000000-0000-0000-0000-000000000001';
    `);

    // 5. Reset reviewer assignment status back to 'assigned'
    const resetAssignment = await client.query(`
      UPDATE reviewer_assignments
      SET status = 'assigned',
          updated_at = NOW()
      WHERE id = '82000000-0000-0000-0000-000000000001';
    `);

    await client.query('COMMIT');

    const duration = Date.now() - startTime;

    return NextResponse.json(
      {
        data: {
          status: 'reset_success',
          match_score: 61,
          has_verified_sql: false,
          deleted_attainments: delAttainments.rowCount,
          deleted_scores: delScores.rowCount,
          deleted_reviews: delReviews.rowCount,
          submission_reset: resetSubmission.rowCount,
          assignment_reset: resetAssignment.rowCount,
          duration_ms: duration,
        },
        meta: {
          timestamp: new Date().toISOString(),
          db_source: 'Supabase PostgreSQL',
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('Error resetting demo state in PostgreSQL:', error);
    return NextResponse.json(
      {
        error: {
          code: 'RESET_FAILED',
          message: error?.message || 'Database error during demo reset',
        },
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
