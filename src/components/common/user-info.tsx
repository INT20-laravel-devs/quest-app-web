'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { Routes } from '@/constants/routes';
import { cn } from '@/utils/styles-utils';
import useAuthStore from '@/store/use-auth-store';
import { buttonVariants } from '@/components/ui/button';

interface UserInfoProps {
  isLoggedIn: boolean;
}

const UserInfo = ({ isLoggedIn }: UserInfoProps) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading && isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  if (!user || !isLoggedIn)
    return (
      <div className={cn('flex items-center gap-3')}>
        <Link
          className={buttonVariants({ variant: 'secondary' })}
          href={Routes.SIGN_IN}
        >
          Login
        </Link>
        <Link className={buttonVariants()} href={Routes.SIGN_UP}>
          Register
        </Link>
      </div>
    );

  return (
    <Link
      href={Routes.PROFILE}
      className={cn(
        'flex items-center justify-center gap-3 hover:bg-transparent',
      )}
    >
      <div className="flex flex-col">
        <span className="font-medium text-right text-sm">{user.nickname}</span>
        <span className="text-xs text-muted-foreground text-right">
          {user.email}
        </span>
      </div>
      <Avatar>
        <AvatarImage src={user.avatarLink || undefined} />
        <AvatarFallback>
          <UserRound
            size={16}
            strokeWidth={2}
            className="opacity-60"
            aria-hidden="true"
          />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserInfo;
