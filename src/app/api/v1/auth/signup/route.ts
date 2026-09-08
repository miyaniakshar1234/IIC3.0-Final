import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role, name, institutionName, program, rollNumber } = body;

    if (!email || !password || !role || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pool = getDbPool();
    
    // Hash password simply for hackathon purposes (SHA256)
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    // Start transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Check if user already exists
      const existing = await client.query('SELECT id FROM hackathon_users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        throw new Error('User with this email already exists');
      }

      // 2. Insert into hackathon_users
      const userRes = await client.query(
        'INSERT INTO hackathon_users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id',
        [email, passwordHash, role]
      );
      const userId = userRes.rows[0].id;

      // 3. Insert into profiles
      await client.query(
        'INSERT INTO profiles (id, display_name, timezone) VALUES ($1, $2, $3)',
        [userId, name, 'UTC']
      );

      // 4. Insert into role-specific tables (student_profiles)
      if (role === 'student') {
        await client.query(
          'INSERT INTO student_profiles (user_id, headline, program) VALUES ($1, $2, $3)',
          [userId, `Aspiring Professional at ${institutionName || 'University'}`, program || '']
        );
      }

      await client.query('COMMIT');

      // Build session object
      const userObj = {
        id: userId,
        email,
        role,
        name,
        avatarInitials: name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
        institutionName: institutionName || null,
        program: program || null,
        rollNumber: rollNumber || null,
        affiliationStatus: 'pending_approval'
      };

      return NextResponse.json({ success: true, user: userObj });
    } catch (error: any) {
      await client.query('ROLLBACK');
      console.error('Signup transaction error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
