import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

const DEMO_STUDENT_ID = '00000000-0000-0000-0000-000000000001';
const DEMO_REVIEWER_ID = '00000000-0000-0000-0000-000000000010';
const DEMO_ASSIGNER_ID = '00000000-0000-0000-0000-000000000030';

const FinalizeSchema = z.object({
  title: z.string().trim().min(3).max(160),
  code: z.string().trim().min(20).max(20_000),
  contribution: z.string().trim().min(20).max(4_000),
  links: z
    .array(z.string().url().refine((url) => url.startsWith('https://'), 'Only HTTPS links are allowed'))
    .max(10),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const requestId = crypto.randomUUID();
  const idResult = z.string().uuid().safeParse(params.id);
  if (!idResult.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Submission ID must be a UUID.' }, meta: { request_id: requestId } },
      { status: 400 }
    );
  }

  const bodyResult = FinalizeSchema.safeParse(await request.json().catch(() => null));
  if (!bodyResult.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Finalized evidence is incomplete or invalid.',
          details: bodyResult.error.flatten().fieldErrors,
        },
        meta: { request_id: requestId },
      },
      { status: 400 }
    );
  }

  const submissionId = idResult.data;
  const { title, code, contribution, links } = bodyResult.data;
  const sha256 = crypto.createHash('sha256').update(code, 'utf8').digest('hex');
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const submissionResult = await client.query(
      `SELECT s.id, s.student_id, s.current_revision, s.version, c.rubric_version,
              c.status AS challenge_status, c.deadline
       FROM submissions s
       JOIN challenges c ON c.id = s.challenge_id
       WHERE s.id = $1 AND s.student_id = $2
       FOR UPDATE OF s;`,
      [submissionId, DEMO_STUDENT_ID]
    );
    if (submissionResult.rows.length === 0) {
      throw new Error('Submission was not found for the synthetic demo student.');
    }

    const submission = submissionResult.rows[0];
    if (submission.challenge_status !== 'published') {
      throw new Error('Only a published challenge can receive finalized evidence.');
    }
    if (new Date(submission.deadline).getTime() < Date.now()) {
      throw new Error('The challenge deadline has passed.');
    }

    const nextRevision = Number(submission.current_revision) + 1;
    const revisionId = crypto.randomUUID();
    await client.query(
      `INSERT INTO submission_revisions
         (id, submission_id, revision_no, rubric_version, title, body, contribution, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, now());`,
      [revisionId, submissionId, nextRevision, submission.rubric_version, title, code, contribution]
    );

    for (let index = 0; index < links.length; index += 1) {
      const url = links[index];
      await client.query(
        'INSERT INTO evidence_links (revision_id, url, label) VALUES ($1, $2, $3);',
        [revisionId, url, `Reference ${index + 1}`]
      );
    }

    await client.query(
      `UPDATE submissions
       SET current_revision = $2, status = 'submitted', version = version + 1, updated_at = now()
       WHERE id = $1;`,
      [submissionId, nextRevision]
    );

    const assignmentId = crypto.randomUUID();
    await client.query(
      `INSERT INTO reviewer_assignments (id, revision_id, reviewer_id, assigned_by, status)
       VALUES ($1, $2, $3, $4, 'assigned');`,
      [assignmentId, revisionId, DEMO_REVIEWER_ID, DEMO_ASSIGNER_ID]
    );

    await client.query(
      `INSERT INTO submission_events (submission_id, revision_id, actor_id, action, reason)
       VALUES ($1, $2, $3, 'SUBMITTED', $4);`,
      [submissionId, revisionId, DEMO_STUDENT_ID, `Synthetic demo finalization; sha256:${sha256}`]
    );
    await client.query(
      `INSERT INTO outbox_events (type, payload_json, status)
       VALUES ('SUBMISSION_FINALIZED', $1::jsonb, 'pending');`,
      [JSON.stringify({ submission_id: submissionId, revision_id: revisionId, assignment_id: assignmentId })]
    );

    await client.query('COMMIT');

    return NextResponse.json({
      data: {
        submission_id: submissionId,
        revision_id: revisionId,
        revision_no: nextRevision,
        assignment_id: assignmentId,
        status: 'submitted',
        proof_hash: `sha256:${sha256}`,
        assigned_reviewer: 'Dr. Alok Sharma (synthetic demo reviewer)',
        submitted_at: new Date().toISOString(),
        persistence: { live_db_synced: true, atomic: true },
      },
      meta: { request_id: requestId, timestamp: new Date().toISOString(), data_scope: 'synthetic_demo' },
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error finalizing submission:', error);
    return NextResponse.json(
      {
        error: { code: 'SUBMISSION_FAILED', message: (error as Error).message || 'Submission finalization failed.' },
        meta: { request_id: requestId },
      },
      { status: 409 }
    );
  } finally {
    client.release();
  }
}
