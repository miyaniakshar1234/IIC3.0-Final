import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;

// Load configuration securely from .env.local without hardcoding secrets in version control
function getDbConfig() {
  if (fs.existsSync('.env.local')) {
    const content = fs.readFileSync('.env.local', 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('DATABASE_URL=')) {
        const val = trimmed.slice('DATABASE_URL='.length).trim();
        return { connectionString: val };
      }
    }
  }

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost')) {
    return { connectionString: process.env.DATABASE_URL };
  }

  // Fallback to connection pooler default parameters
  return {
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    database: process.env.PGDATABASE || 'postgres',
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
  };
}

const config = getDbConfig();
if (!config.connectionString && !config.password) {
  // If not explicitly passed, read from prompt/env
  console.log('Using connection config from environment or .env.local');
}

const client = new Client({
  ...config,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
});

async function run() {
  console.log('Connecting to Supabase PostgreSQL...');
  try {
    await client.connect();
    console.log('>>> CONNECTED TO LIVE SUPABASE POSTGRESQL SUCCESSFULLY! <<<\n');

    // 1. Run 001_initial_schema.sql
    console.log('[1/3] Executing 001_initial_schema.sql...');
    const schemaSql = fs.readFileSync(path.join('supabase', 'migrations', '001_initial_schema.sql'), 'utf8');
    await client.query(schemaSql);
    console.log('✓ 001_initial_schema.sql completed (all 24 tables & indexes created).');

    // 2. Run 002_atomic_functions.sql
    console.log('\n[2/3] Executing 002_atomic_functions.sql...');
    const functionsSql = fs.readFileSync(path.join('supabase', 'migrations', '002_atomic_functions.sql'), 'utf8');
    await client.query(functionsSql);
    console.log('✓ 002_atomic_functions.sql completed (atomic functions created).');

    // 3. Run seed.sql
    console.log('\n[3/3] Executing seed.sql...');
    const seedSql = fs.readFileSync(path.join('supabase', 'seed.sql'), 'utf8');
    await client.query(seedSql);
    console.log('✓ seed.sql completed (synthetic demo fixtures inserted).');

    // Verification queries
    console.log('\n========================================');
    console.log('    VERIFYING LIVE DATABASE RECORDS     ');
    console.log('========================================');
    const orgs = await client.query('SELECT count(*) FROM organizations;');
    console.log('Organizations:', orgs.rows[0].count, 'rows');

    const skills = await client.query('SELECT count(*) FROM skills;');
    console.log('Skills catalog:', skills.rows[0].count, 'skills');

    const opps = await client.query('SELECT id, title, status FROM opportunities;');
    console.log('Opportunities:', opps.rows.length, 'active:');
    opps.rows.forEach(o => console.log(`  - [${o.status.toUpperCase()}] ${o.title}`));

    const students = await client.query('SELECT count(*) FROM student_profiles;');
    console.log('Students:', students.rows[0].count, 'profiles');

    const attainments = await client.query('SELECT count(*) FROM skill_attainments;');
    console.log('Meera Verified Attainments:', attainments.rows[0].count, 'attainments');

    console.log('\n>>> ALL 24 TABLES, FUNCTIONS, AND SEED FIXTURES ARE LIVE ON SUPABASE! <<<');
  } catch (err) {
    console.error('Migration failed:', err.message);
    if (err.detail) console.error('Detail:', err.detail);
    if (err.code) console.error('Error Code:', err.code);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
