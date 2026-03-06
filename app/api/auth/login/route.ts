import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

// STEP 2: Verify operator_id + password + email all match the same record
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { operator_id, password, email } = body;

    // 1. Validate all 3 fields are present
    if (!operator_id || !password || !email) {
      return NextResponse.json({ error: 'Operator ID, Password, and Email are all required' }, { status: 400 });
    }

    // 2. Find operator by operator_id (prepared statement prevents SQL injection)
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM operators WHERE operator_id = ?',
      [operator_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = rows[0];

    // 3. Verify email matches the same operator record
    if (user.email !== email) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 4. Verify password against bcrypt hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 5. All 3 match — generate JWT session token (1 hour expiry)
    const secret = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod';
    const token = jwt.sign(
      { operator_id, email, role: 'operator', boot_id: process.env.SERVER_BOOT_ID },
      secret,
      { expiresIn: '1h' }
    );

    // 6. Set secure HTTP-only cookie
    const response = NextResponse.json({
      message: 'Authentication successful',
      operator_id
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
      // No maxAge — session cookie, dies when browser closes
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
