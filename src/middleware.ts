import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/dashboard') {
    return NextResponse.redirect(
      new URL('/dashboard/dashboard-home', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
