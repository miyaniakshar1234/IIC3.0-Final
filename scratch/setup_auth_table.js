const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').find(l => l.startsWith('DATABASE_URL=')).split('=')[1].trim();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: env, ssl: { rejectUnauthorized: false } });

async function setup() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hackathon_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    
    // Check if we need to add email to profiles (or we can just join hackathon_users)
    console.log("hackathon_users table created/verified.");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
setup();
