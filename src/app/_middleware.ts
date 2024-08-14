import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  const { pathname } = req.nextUrl;

    // redirect to login when the user opens the app and there is no url
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Redirect to dashboard if the token exists and the user is trying to access the login page
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Redirect to login if the token doesn't exist and the user is trying to access the dashboard
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
