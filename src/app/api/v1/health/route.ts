import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    data: {
      status: 'healthy',
      service: 'ProofBridge Core API',
      version: '1.0.0',
      milestone: 'IIC 3.0 MUJ Final',
      database: 'PostgreSQL + RLS',
      deterministic_engine: 'coverage-v1',
      timestamp: new Date().toISOString(),
    },
    meta: {
      request_id: crypto.randomUUID(),
    },
  });
}
