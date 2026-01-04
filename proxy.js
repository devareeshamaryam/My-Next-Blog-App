import { NextResponse } from 'next/server';

// Function ka naam "middleware" se "proxy" change karo
export function proxy(request) {
  const path = request.nextUrl.pathname;
  const authCookie = request.cookies.get('admin-authenticated');
  
  console.log('Path:', path);
  console.log('Cookie:', authCookie?.value);
  
  // Agar admin route hai AUR login page NAHI hai
  if (path.startsWith('/admin') && path !== '/admin-login') {
    if (!authCookie?.value) {
      console.log('Not authenticated - redirecting to login');
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
    console.log('Authenticated - allowing access');
  }
  
  // Agar login page pe ja rahe ho AUR already logged in ho
  if (path === '/admin-login' && authCookie?.value === 'true') {
    console.log('Already logged in - redirecting to admin');
    return NextResponse.redirect(new URL('/admin/addProduct', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin-login'],
};