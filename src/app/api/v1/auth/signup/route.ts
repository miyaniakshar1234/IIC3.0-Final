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
      // 1. Check if user already exists (case-insensitive)
      const existing = await client.query('SELECT id FROM hackathon_users WHERE LOWER(email) = LOWER($1)', [email.trim()]);
      if (existing.rows.length > 0) {
        return NextResponse.json(
          { error: 'An account with this email address already exists. Please sign in.' },
          { status: 409 }
        );
      }

      await client.query('BEGIN');

      // 2. Insert into hackathon_users
      const userRes = await client.query(
        'INSERT INTO hackathon_users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id',
        [email.trim().toLowerCase(), passwordHash, role]
      );
      const userId = userRes.rows[0].id;

      // 3. Insert into profiles
      await client.query(
        'INSERT INTO profiles (id, display_name, timezone) VALUES ($1, $2, $3)',
        [userId, name.trim(), 'Asia/Kolkata']
      );

      // 4. Insert into role-specific tables
      if (role === 'student') {
        const gradYearMatch = (program || '').match(/\b(202\d)\b/);
        const graduationYear = gradYearMatch ? parseInt(gradYearMatch[1], 10) : 2026;

        await client.query(
          'INSERT INTO student_profiles (user_id, headline, program, graduation_year) VALUES ($1, $2, $3, $4)',
          [
            userId,
            `Aspiring Professional · ${program || 'MCA 2026'} at ${institutionName || 'Manipal University Jaipur (MUJ)'}`,
            program || 'Master of Computer Applications (MCA 2026)',
            graduationYear
          ]
        );

        // Find institution org
        let instOrgId = '10000000-0000-0000-0000-000000000001';
        const instOrg = await client.query("SELECT id FROM organizations WHERE kind = 'institution' LIMIT 1");
        if (instOrg.rows.length > 0) {
          instOrgId = instOrg.rows[0].id;
        }

        await client.query(`
          INSERT INTO enrollments (institution_id, student_id, status)
          VALUES ($1, $2, 'active')
          ON CONFLICT DO NOTHING
        `, [instOrgId, userId]);

      } else if (role === 'employer') {
        const empName = (institutionName || 'Sample Analytics Studio').trim();
        let orgId: string;
        const orgLookup = await client.query(
          'SELECT id FROM organizations WHERE kind = $1 AND LOWER(name) = LOWER($2) LIMIT 1',
          ['employer', empName]
        );
        if (orgLookup.rows.length > 0) {
          orgId = orgLookup.rows[0].id;
        } else {
          const createOrg = await client.query(
            'INSERT INTO organizations (kind, name, status) VALUES ($1, $2, $3) RETURNING id',
            ['employer', empName, 'approved']
          );
          orgId = createOrg.rows[0].id;
        }

        await client.query(`
          INSERT INTO memberships (org_id, user_id, role, status)
          VALUES ($1, $2, 'recruiter', 'active')
          ON CONFLICT DO NOTHING
        `, [orgId, userId]);

      } else if (role === 'reviewer') {
        let instOrgId = '10000000-0000-0000-0000-000000000001';
        const instOrg = await client.query("SELECT id FROM organizations WHERE kind = 'institution' LIMIT 1");
        if (instOrg.rows.length > 0) {
          instOrgId = instOrg.rows[0].id;
        }

        await client.query(`
          INSERT INTO memberships (org_id, user_id, role, status)
          VALUES ($1, $2, 'reviewer', 'active')
          ON CONFLICT DO NOTHING
        `, [instOrgId, userId]);

      } else if (role === 'institution') {
        const instName = (institutionName || 'Manipal University Jaipur (MUJ)').trim();
        let orgId: string;
        const orgLookup = await client.query(
          'SELECT id FROM organizations WHERE kind = $1 AND LOWER(name) = LOWER($2) LIMIT 1',
          ['institution', instName]
        );
        if (orgLookup.rows.length > 0) {
          orgId = orgLookup.rows[0].id;
        } else {
          const createOrg = await client.query(
            'INSERT INTO organizations (kind, name, status) VALUES ($1, $2, $3) RETURNING id',
            ['institution', instName, 'approved']
          );
          orgId = createOrg.rows[0].id;
        }

        await client.query(`
          INSERT INTO memberships (org_id, user_id, role, status)
          VALUES ($1, $2, 'admin', 'active')
          ON CONFLICT DO NOTHING
        `, [orgId, userId]);
      }

      await client.query('COMMIT');

      // Build session object
      const userObj = {
        id: userId,
        email: email.trim().toLowerCase(),
        role,
        name: name.trim(),
        avatarInitials: name.trim().split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
        institutionName: institutionName || (role === 'employer' ? undefined : 'Manipal University Jaipur (MUJ)'),
        companyName: role === 'employer' ? (institutionName || 'Sample Analytics Studio') : undefined,
        program: program || (role === 'student' ? 'Master of Computer Applications (MCA 2026)' : undefined),
        rollNumber: rollNumber || null,
        affiliationStatus: role === 'student' ? 'pending_approval' : 'approved',
      };

      return NextResponse.json({ success: true, user: userObj }, { status: 201 });
    } catch (error: any) {
      await client.query('ROLLBACK');
      console.error('Signup transaction error:', error);
      return NextResponse.json({ error: error.message || 'Database registration error' }, { status: 400 });
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
