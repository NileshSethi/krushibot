import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
  try {
    const { operator_id, otp } = await req.json();

    if (!operator_id || !otp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Verify OTP
    const [tokens] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM otp_tokens WHERE operator_id = ? AND otp_code = ? AND used = 0 AND expires_at > NOW()',
      [operator_id, otp]
    );

    if (tokens.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    // 2. Mark OTP as used
    await pool.execute('UPDATE otp_tokens SET used = 1 WHERE id = ?', [tokens[0].id]);

    // 3. Generate JWT
    const secret = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod';
    const token = jwt.sign(
      { operator_id, role: 'operator' },
      secret,
      { expiresIn: '1h' }
    );

    // 4. Set Cookie
    const response = NextResponse.json({ 
      message: 'Authentication successful',
      token 
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });

    return response;

  } catch (error) {
    console.error('OTP Verification Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}