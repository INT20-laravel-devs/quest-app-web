export enum Routes {
  HOME = '/',
  QUESTS = '/quests',
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  PROFILE = '/profile',
  QUEST = '/quests/[id]',
  QUEST_GAME = '/quests/[id]/game',
  CREATE_QUEST = '/quests/create',
  QUEST_CREATE_TASKS = '/quests/create/[id]',
  QUEST_PUBLISH = '/quests/create/[id]/publish',
}

export const HeaderRoutes = [
  { name: 'Home', route: Routes.HOME },
  { name: 'Quests', route: Routes.QUESTS },
];

export const publicRoutes = [Routes.HOME, Routes.QUESTS];
export const protectedRoutes = [Routes.PROFILE, Routes.CREATE_QUEST];

export const authRoutes = [Routes.SIGN_IN, Routes.SIGN_UP];
