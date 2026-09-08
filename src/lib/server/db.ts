import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

let pool: Pool | null = null;

const DEFAULT_SUPABASE_POOLER_URL =
  'postgresql://postgres.evawbpodadolwqlqplgc:AksharMiyani%402005@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';

function resolveDatabaseUrl(): string {
  // 1. Check .env.local in project root
  try {
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('DATABASE_URL=')) {
          const val = trimmed.slice('DATABASE_URL='.length).trim();
          if (val && !val.includes('localhost')) {
            return val;
          }
        }
      }
    }
  } catch {
    // Ignore filesystem read errors in constrained environments
  }

  // 2. Check process.env.DATABASE_URL if not pointing to a foreign localhost
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost')) {
    return process.env.DATABASE_URL;
  }

  // 3. Fallback to live Supabase pooler credentials
  return DEFAULT_SUPABASE_POOLER_URL;
}

/**
 * Returns a pooled PostgreSQL client connected via DATABASE_URL
 * Configured with SSL support for Supabase pooler / direct database.
 */
export function getDbPool(): Pool | null {
  const connectionString = resolveDatabaseUrl();

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on('error', (err) => {
      console.error('[ProofBridge DB Pool Error]', err);
    });
  }

  return pool;
}
