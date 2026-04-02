import { NextResponse } from 'next/server';
import supabase from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { operator_id, password } = body;

    if (!operator_id || !password) {
      return NextResponse.json({ message: 'Operator ID and Password are required' }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from('operators')
      .select('*')
      .eq('operator_id', operator_id)
      .single();

    if (error || !user) {
      return NextResponse.json({ message: 'USER_NOT_FOUND' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json({ message: 'INVALID_PASSWORD' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod';
    const token = jwt.sign(
      { operator_id, role: 'operator' },
      secret,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({
      message: 'SUCCESS',
      operator_id
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
