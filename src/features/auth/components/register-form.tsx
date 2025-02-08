'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/styles-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Routes } from '@/constants/routes';
import { RegisterFormInputs, registerSchema } from '@/features/auth/auth-types';
import { signUp } from '@/api/auth';
import { toast } from 'sonner';

const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await signUp(data);
      toast.success('Account created successfully! Please check your email');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create new account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email, nickname and password to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <Input
          id="nickname"
          label="Nickname"
          type="text"
          placeholder="sachko135"
          error={errors.nickname?.message}
          {...register('nickname')}
        />
        <Input
          id="email"
          label="Email"
          type="text"
          placeholder="m@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button isLoading={isSubmitting} type="submit" className="w-full">
          Register
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <a href={Routes.SIGN_IN} className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
