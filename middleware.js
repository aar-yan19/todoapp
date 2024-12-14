import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value; 
  const url = req.nextUrl.clone();

 
  if (token && url.pathname === '/login') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  const protectedRoutes = ['/' ,'/createtask'];
  if (!token && protectedRoutes.includes(url.pathname)) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/createtask'], 
};
