import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // Protected Routes - Now pushing ALL traffic except auth/login/signup to verify first.
  const path = request.nextUrl.pathname;
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/api/auth');
  const isStaticFile = path.startsWith('/_next') || path.includes('.');
  const isPublicLanding = path === '/' || path === '/favicon.ico';

  // If the user tries to go ANYWHERE else other than login/signup, they must be authenticated.
  if (!isAuthRoute && !isStaticFile && !isPublicLanding) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-prod'
      );

      // Verify JWT using jose (Edge compatible)
      await jwtVerify(token, secret);

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
  // Catch all routes except api, _next/static, _next/image, favicon.ico
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
