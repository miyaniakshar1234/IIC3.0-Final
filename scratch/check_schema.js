const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').find(l => l.startsWith('DATABASE_URL=')).split('=')[1].trim();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: env, ssl: { rejectUnauthorized: false } });

async function check() {
  try {
    const res = await pool.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'profiles'`);
    console.log('PROFILES:', res.rows);
    const res2 = await pool.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'student_profiles'`);
    console.log('STUDENT_PROFILES:', res2.rows);
  } finally {
    pool.end();
  }
}
check();
