'use client';

import { PropsWithChildren, useEffect } from 'react';
import { getMe } from '@/api/auth';
import { hydrateAuthStore } from '@/store/use-auth-store';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const fetchUser = async () => {
    try {
      const user = await getMe();
      hydrateAuthStore(user);
    } catch (e) {
      hydrateAuthStore(null);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
