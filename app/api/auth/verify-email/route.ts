import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// STEP 1: Verify that the email exists in the operators table
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if email belongs to a registered operator (prepared statement prevents SQL injection)
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT operator_id FROM operators WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Email not registered in the system' }, { status: 404 });
    }

    // Email exists — allow user to proceed to operator login
    return NextResponse.json({
      message: 'Email verified',
      verified: true
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
