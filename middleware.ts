import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // Protected Routes
  if (
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/controls')
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod'
      );

      // Verify JWT using jose (Edge compatible)
      const { payload } = await jwtVerify(token, secret);

      // Check if token was issued during current server session
      if (payload.boot_id !== process.env.SERVER_BOOT_ID) {
        throw new Error('Server restarted — session invalidated');
      }

      // Token valid — allow access
      return NextResponse.next();
    } catch (err) {
      // Token invalid or expired — redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/controls/:path*'],
};
