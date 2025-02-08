'use client';

import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import AuthProvider from '@/providers/auth-provider';

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <AuthProvider>{children}</AuthProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default Providers;
