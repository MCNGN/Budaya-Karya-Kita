import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  const url = request.nextUrl.clone();

  if (!isLoggedIn || userRole !== 'admin') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*', // Apply middleware to all routes under /admin
};