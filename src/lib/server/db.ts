import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

let pool: Pool | null = null;

function resolveDatabaseUrl(): string {
  // 1. Check process.env.DATABASE_URL first (if not an ambient localhost collision)
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost')) {
    return process.env.DATABASE_URL;
  }

  // 2. Read explicitly from .env.local or .env in project root
  for (const envFileName of ['.env.local', '.env']) {
    try {
      const envPath = path.join(process.cwd(), envFileName);
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
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
      // Ignore filesystem read errors in serverless environments
    }
  }

  // If localhost is present or no url found, check if DATABASE_URL was provided
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  throw new Error(
    'DATABASE_URL is not configured. Please create a .env or .env.local file using .env.example template.'
  );
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
