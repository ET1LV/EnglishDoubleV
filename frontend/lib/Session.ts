'use server';
import { cookies } from 'next/headers';

export async function saveCookie(payload: object) {
  const str = JSON.stringify(payload);
  (await cookies()).set('user-data', str, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}

export async function getCookie() {
  const cookieStore = await cookies();
  const userData = cookieStore.get('user_data');
  if (userData) {
    return JSON.parse(userData.value);
  }
  return null;
}