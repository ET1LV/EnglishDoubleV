import { NextResponse } from 'next/server';

const cookieName = 'user-data';

export async function POST(request: Request) {
  const payload = await request.json();
  const res = NextResponse.redirect(new URL('/me', request.url));
  res.cookies.set(cookieName, JSON.stringify(payload), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}

export async function GET(request: Request) {
  const cookieStore = request.headers.get('cookie');
  if (!cookieStore) {
    return NextResponse.json({ error: 'No cookies found' }, { status: 400 });
  }
  const cookies = Object.fromEntries(cookieStore.split('; ').map(c => c.split('=')));
  const userData = cookies[cookieName];
  if (userData) {
    return NextResponse.json(JSON.parse(userData));
  } else {
    return NextResponse.json({ error: 'User data not found' }, { status: 404 });
  }
}