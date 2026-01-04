 import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;
    
    console.log('Received password:', password);
    console.log('Expected password:', process.env.ADMIN_PASSWORD);
    
    if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Cookie name change karo: admin_auth -> admin-authenticated
      response.cookies.set('admin-authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
      
      return response;
    }
    
    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}