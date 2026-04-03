import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const ESP32_URL    = process.env.ESP32_URL    || 'http://192.168.1.100';
const ESP32_SECRET = process.env.ESP32_SECRET || 'change-this-secret';

export async function GET(req: Request) {
  // Auth check — same as command route
  const cookie = req.headers.get('cookie') || '';
  const token  = cookie.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
  if (!token) return NextResponse.json({ online: false }, { status: 401 });
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod');
    await jwtVerify(token, secret);
  } catch {
    return NextResponse.json({ online: false }, { status: 401 });
  }

  try {
    const res = await fetch(`${ESP32_URL}/health`, {
      headers: { 'X-ESP32-Secret': ESP32_SECRET },
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return NextResponse.json({ online: false });
    const data = await res.json();
    // data from ESP32: { status, emergency, speed, battery_mv? }
    return NextResponse.json({ online: true, ...data });
  } catch {
    return NextResponse.json({ online: false });
  }
}
