import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const requestId = crypto.randomUUID();

  try {
    const pool = getDbPool();
    await pool.query('SELECT 1 AS ok');

    return NextResponse.json({
      data: {
        status: 'healthy',
        service: 'ProofBridge Core API',
        version: '1.0.0',
        database: 'connected',
        row_level_security: 'not_verified_by_this_endpoint',
        deterministic_engine: 'coverage-v1',
        timestamp: new Date().toISOString(),
      },
      meta: { request_id: requestId },
    });
  } catch (error) {
    console.error('Health check database probe failed:', error);
    return NextResponse.json(
      {
        data: {
          status: 'unhealthy',
          service: 'ProofBridge Core API',
          database: 'unavailable',
          timestamp: new Date().toISOString(),
        },
        meta: { request_id: requestId },
      },
      { status: 503 }
    );
  }
}
