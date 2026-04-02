import { NextResponse } from 'next/server';
import supabase from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { operator_id, email, password } = body;

    if (!operator_id || !password || !email) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from('operators')
      .select('id')
      .or(`operator_id.eq.${operator_id},email.eq.${email}`)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ message: 'USER_EXISTS' }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const { error: insertError } = await supabase
      .from('operators')
      .insert([{
        operator_id,
        email,
        password_hash,
        email_verified: true
      }]);

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
    }

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
