'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/styles-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Routes } from '@/constants/routes';
import { LoginFormInputs, loginSchema } from '@/features/auth/auth-types';

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email or nickname below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Input
          id="nickname"
          label="Nickname / Email"
          type="text"
          placeholder="m@example.com"
          error={errors.nickname?.message}
          {...register('nickname')}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <a href={Routes.SIGN_UP} className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
