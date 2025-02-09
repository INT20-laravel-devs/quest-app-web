export enum Routes {
  HOME = '/',
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  PROFILE = '/profile',
}

export const HeaderRoutes = [{ name: 'Home', route: Routes.HOME }];

export const publicRoutes = [Routes.HOME];
export const protectedRoutes = [Routes.PROFILE];
export const authRoutes = [Routes.SIGN_IN, Routes.SIGN_UP];
