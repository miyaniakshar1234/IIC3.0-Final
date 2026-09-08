import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/server/db';

export async function GET() {
  try {
    const pool = getDbPool();
    const result = await pool.query(`
      SELECT hu.id, p.display_name as name
      FROM hackathon_users hu
      JOIN profiles p ON hu.id = p.id
      WHERE hu.role = 'institution'
      ORDER BY p.display_name ASC
    `);

    // Add MUJ as a default if it doesn't exist yet, to ensure the UI has something
    const institutions = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      code: 'U-' + row.id.substring(0, 4).toUpperCase(),
      accreditation: 'Registered Institution'
    }));

    if (institutions.length === 0) {
       institutions.push({
         id: 'inst-muj-fallback',
         name: 'Manipal University Jaipur (MUJ)',
         code: 'U-0683',
         accreditation: 'NAAC A+ · NBA'
       });
    }

    return NextResponse.json({ success: true, data: institutions });
  } catch (error: any) {
    console.error('Fetch institutions error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
