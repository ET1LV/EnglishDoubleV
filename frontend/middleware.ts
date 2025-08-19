import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieVal = request.cookies.get('user-data')?.value;
  const { pathname } = request.nextUrl;

  const isPublicPage = pathname === '/register' || pathname === '/login' || pathname.startsWith('/_next');

  if (!isPublicPage && !cookieVal) {
    const url = request.nextUrl.clone();
    url.pathname = '/register';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], 
};
