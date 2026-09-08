import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const pool = getDbPool();
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    // Fetch user and verify password
    const result = await pool.query(`
      SELECT hu.id, hu.email, hu.role, p.display_name, sp.program, sp.headline
      FROM hackathon_users hu
      LEFT JOIN profiles p ON hu.id = p.id
      LEFT JOIN student_profiles sp ON hu.id = sp.user_id
      WHERE hu.email = $1 AND hu.password_hash = $2
    `, [email, passwordHash]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const dbUser = result.rows[0];

    // Build session object
    const userObj = {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
      name: dbUser.display_name || 'User',
      avatarInitials: (dbUser.display_name || 'U').split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
      institutionName: dbUser.role === 'student' ? 'Manipal University Jaipur (MUJ)' : null,
      program: dbUser.program || null,
      affiliationStatus: 'approved'
    };

    return NextResponse.json({ success: true, user: userObj });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
