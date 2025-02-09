import { NextRequest, NextResponse } from 'next/server';
import {
  authRoutes,
  protectedRoutes,
  publicRoutes,
  Routes,
} from '@/constants/routes';

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const cookies = req.cookies;
  const isLoggedIn = !!cookies.get('jwt');

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname as Routes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname as Routes);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname as Routes);

  if (isPublicRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn)
      return NextResponse.redirect(new URL(Routes.PROFILE, nextUrl.origin));
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!isLoggedIn)
      return NextResponse.redirect(new URL(Routes.SIGN_IN, nextUrl.origin));
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
