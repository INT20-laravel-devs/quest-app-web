export enum Routes {
  HOME = '/',
  QUESTS = '/quests',
  QUEST_CREATE = '/quest-create',
  ROUND_CREATE = '/round-create',
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  PROFILE = '/profile',
}

export const HeaderRoutes = [
  { name: 'Home', route: Routes.HOME },
  { name: 'Quests', route: Routes.QUESTS },
 
];

export const publicRoutes = [Routes.HOME];
export const protectedRoutes = [Routes.PROFILE];

export const authRoutes = [Routes.SIGN_IN, Routes.SIGN_UP];

