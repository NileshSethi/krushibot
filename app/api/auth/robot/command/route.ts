import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PI_SERVER_URL = process.env.PI_SERVER_URL || 'http://raspberrypi.local:5001';
const PI_SECRET_KEY = process.env.PI_SECRET_KEY || 'change-this-shared-secret';

export async function POST(req: Request) {
  // Verify the auth cookie before forwarding any command to the Pi
  const cookieHeader = req.headers.get('cookie') || '';
  const token = cookieHeader
    .split(';')
    .find(c => c.trim().startsWith('auth_token='))
    ?.split('=')[1];

  if (!token) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod'
    );
    await jwtVerify(token, secret);
  } catch {
    return NextResponse.json({ message: 'INVALID_TOKEN' }, { status: 401 });
  }

  let body: { command: string; value?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Bad request body' }, { status: 400 });
  }

  const { command, value } = body;

  // Whitelist of allowed commands — only these ever reach the Pi
  const ALLOWED_COMMANDS = [
    'start',
    'stop',
    'emergency_stop',
    'seeding_on',
    'seeding_off',
    'ploughing_on',
    'ploughing_off',
    'irrigation_on',
    'irrigation_off',
  ] as const;

  if (!ALLOWED_COMMANDS.includes(command as typeof ALLOWED_COMMANDS[number])) {
    return NextResponse.json({ message: 'Unknown command' }, { status: 400 });
  }

  try {
    const piRes = await fetch(`${PI_SERVER_URL}/command`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Shared secret so only your Next.js server can talk to the Pi
        'X-Pi-Secret': PI_SECRET_KEY,
      },
      body: JSON.stringify({ command, value }),
      // Abort quickly if the Pi is unreachable
      signal: AbortSignal.timeout(4000),
    });

    if (!piRes.ok) {
      const err = await piRes.text();
      console.error('Pi server error:', err);
      return NextResponse.json({ message: 'Pi error', detail: err }, { status: 502 });
    }

    const data = await piRes.json();
    return NextResponse.json({ message: 'OK', ...data });
  } catch (err: any) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      return NextResponse.json({ message: 'Pi unreachable (timeout)' }, { status: 504 });
    }
    console.error('Command relay error:', err);
    return NextResponse.json({ message: 'Relay error' }, { status: 500 });
  }
}
