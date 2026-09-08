import pg from 'pg';
import fs from 'fs';

const { Client } = pg;

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

  throw new Error(
    'DATABASE_URL not found! Please ensure .env or .env.local exists with a valid DATABASE_URL.'
  );
}

async function resetDemoState() {
  const startTime = Date.now();
  console.log('🔄 [ProofBridge Demo Reset] Initializing state reset for IIC 3.0 MUJ...');

  const config = getDbConfig();
  const client = new Client({
    ...config,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    console.log('  ⚡ Connected to PostgreSQL pooler');

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

    // 4. Reset reviewer assignment back to 'assigned'
    await client.query(`
      UPDATE reviewer_assignments 
      SET status = 'assigned', updated_at = now()
      WHERE id = '82000000-0000-0000-0000-000000000001';
    `);

    // 5. Reset submission status back to 'submitted'
    await client.query(`
      UPDATE submissions 
      SET status = 'submitted', updated_at = now()
      WHERE id = '80000000-0000-0000-0000-000000000001';
    `);

    // 6. Clean published outbox events
    await client.query(`
      DELETE FROM outbox_events
      WHERE type = 'REVIEW_PUBLISHED'
        AND payload_json->>'student_id' = '00000000-0000-0000-0000-000000000001';
    `);

    // 7. Delete evaluation reviews & scores
    await client.query(`
      DELETE FROM evaluation_review_scores
      WHERE review_id IN (
        SELECT id FROM evaluation_reviews
        WHERE revision_id = '81000000-0000-0000-0000-000000000001'
           OR assignment_id = '82000000-0000-0000-0000-000000000001'
      );
    `);
    await client.query(`
      DELETE FROM evaluation_reviews
      WHERE revision_id = '81000000-0000-0000-0000-000000000001'
         OR assignment_id = '82000000-0000-0000-0000-000000000001';
    `);

    // 8. Reset application status and clear application audit events
    await client.query(`
      UPDATE applications 
      SET status = 'submitted', version = 1, updated_at = NOW() 
      WHERE id = '70000000-0000-0000-0000-000000000001';
    `);
    await client.query(`
      DELETE FROM application_events
      WHERE application_id = '70000000-0000-0000-0000-000000000001';
    `);

    await client.query('COMMIT');

    const duration = Date.now() - startTime;
    console.log(`\n✅ [ProofBridge Demo Reset] Completed successfully in ${duration}ms!`);
    console.log(`  - Deleted ${delAttainments.rowCount} SQL skill attainment(s)`);
    console.log(`  - Deleted ${delScores.rowCount} review score(s)`);
    console.log(`  - Deleted ${delReviews.rowCount} review(s)`);
    console.log(`  - Submission '80000000-0000-0000-0000-000000000001' reset to 'submitted'`);
    console.log(`  - Assignment '82000000-0000-0000-0000-000000000001' reset to 'assigned'`);
    console.log(`  - Meera Patel baseline restored: 61% (Spreadsheets 25 + Comm 12 + Reasoning 24)`);
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('❌ [ProofBridge Demo Reset] Error:', error);
    process.exit(1);
  } finally {
    await client.end().catch(() => {});
  }
}

resetDemoState();
