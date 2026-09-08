import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

const TransitionStatusSchema = z.object({
  to_status: z.enum([
    'submitted',
    'shortlisted',
    'interview',
    'offered',
    'accepted',
    'rejected',
    'withdrawn',
    'declined',
  ]),
  reason: z.string().optional().default('Candidate evaluation review transition'),
  expected_version: z.number().int().min(1).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const applicationId = params.id;
  const requestId = crypto.randomUUID();

  try {
    const rawBody = await request.json();
    const validation = TransitionStatusSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid application status payload',
            details: validation.error.flatten().fieldErrors,
          },
          meta: { request_id: requestId, timestamp: new Date().toISOString() },
        },
        { status: 400 }
      );
    }

    const { to_status, reason, expected_version } = validation.data;
    const pool = getDbPool();

    if (!pool) {
      return NextResponse.json(
        { error: { message: 'Database connection unavailable' } },
        { status: 500 }
      );
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Fetch current application
      const currentRes = await client.query(
        `SELECT id, status, version, student_id FROM applications WHERE id = $1 FOR UPDATE;`,
        [applicationId]
      );

      if (currentRes.rows.length === 0) {
        await client.query('ROLLBACK');
        return NextResponse.json(
          { error: { message: `Application ${applicationId} not found` } },
          { status: 404 }
        );
      }

      const current = currentRes.rows[0];
      const fromStatus = current.status;
      const currentVersion = current.version;

      if (expected_version !== undefined && expected_version !== currentVersion) {
        await client.query('ROLLBACK');
        return NextResponse.json(
          {
            error: {
              code: 'CONCURRENCY_CONFLICT',
              message: `Version conflict: Expected version ${expected_version}, but database is at ${currentVersion}`,
            },
          },
          { status: 409 }
        );
      }

      // 2. Update application status and version
      const updateRes = await client.query(
        `UPDATE applications 
         SET status = $1, version = version + 1, updated_at = NOW() 
         WHERE id = $2 
         RETURNING id, status, version, updated_at;`,
        [to_status, applicationId]
      );

      const updated = updateRes.rows[0];

      // 3. Insert audit log event
      const actorId = '00000000-0000-0000-0000-000000000020'; // Neha Verma (Employer)
      const eventId = crypto.randomUUID();
      await client.query(
        `INSERT INTO application_events (id, application_id, actor_id, from_status, to_status, reason, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW());`,
        [eventId, applicationId, actorId, fromStatus, to_status, reason]
      );

      await client.query('COMMIT');

      return NextResponse.json({
        data: {
          application_id: updated.id,
          from_status: fromStatus,
          status: updated.status,
          version: updated.version,
          updated_at: updated.updated_at,
          audit_event_id: eventId,
        },
        meta: {
          request_id: requestId,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (dbErr) {
      await client.query('ROLLBACK');
      throw dbErr;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error transitioning application status:', err);
    return NextResponse.json(
      { error: { message: (err as Error).message } },
      { status: 500 }
    );
  }
}
