import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { operator_id, email, password } = body;

    if (!operator_id || !password || !email) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM operators WHERE operator_id = ? OR email = ? LIMIT 1',
      [operator_id, email]
    );

    if (rows.length > 0) {
      return NextResponse.json({ message: 'USER_EXISTS' }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await pool.execute(
      'INSERT INTO operators (operator_id, email, password_hash, email_verified) VALUES (?, ?, ?, ?)',
      [operator_id, email, password_hash, true]
    );

    // Auto-login the user after registration so they don't have to login manually
    const secret = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod';
    const token = jwt.sign(
      { operator_id, role: 'operator' },
      secret,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ message: 'REGISTERED', operator_id }, { status: 201 });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
