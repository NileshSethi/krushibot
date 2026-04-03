import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const ESP32_URL    = process.env.ESP32_URL    || 'http://192.168.1.100';
const ESP32_SECRET = process.env.ESP32_SECRET || 'change-this-to-a-long-random-string-minimum-32-chars';

const ALLOWED_COMMANDS = new Set([
  'start', 'stop', 'emergency_stop',
  'seeding_on', 'seeding_off',
  'ploughing_on', 'ploughing_off',
  'irrigation_on', 'irrigation_off',
  'joystick',
]);

async function verifyAuth(req: Request): Promise<boolean> {
  const cookie = req.headers.get('cookie') || '';
  const token  = cookie.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod'
    );
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!(await verifyAuth(req))) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 });
  }

  let body: { command: string; speed?: number; dir?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Bad request body' }, { status: 400 });
  }

  if (!ALLOWED_COMMANDS.has(body.command)) {
    return NextResponse.json({ message: 'Unknown command' }, { status: 400 });
  }

  // Extra validation for joystick command
  if (body.command === 'joystick') {
    const speed = Number(body.speed ?? 0);
    if (speed < 0 || speed > 255 || !Number.isInteger(speed)) {
      return NextResponse.json({ message: 'Invalid speed' }, { status: 400 });
    }
    if (body.dir && !['forward', 'backward', 'stop'].includes(body.dir)) {
      return NextResponse.json({ message: 'Invalid dir' }, { status: 400 });
    }
  }

  try {
    const esp32Res = await fetch(`${ESP32_URL}/command`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ESP32-Secret': ESP32_SECRET,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3000),
    });

    if (!esp32Res.ok) {
      const err = await esp32Res.text();
      return NextResponse.json({ message: 'ESP32 error', detail: err }, { status: 502 });
    }

    const data = await esp32Res.json();
    return NextResponse.json({ message: 'OK', ...data });
  } catch (err: any) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      return NextResponse.json({ message: 'ESP32 unreachable (timeout)' }, { status: 504 });
    }
    return NextResponse.json({ message: 'Relay error', detail: err.message }, { status: 500 });
  }
}
