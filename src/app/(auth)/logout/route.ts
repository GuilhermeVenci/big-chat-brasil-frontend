import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.headers.set(
    'Set-Cookie',
    serialize('token', '', {
      maxAge: -1,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
    })
  );

  return response;
}
