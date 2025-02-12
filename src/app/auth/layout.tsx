import { PropsWithChildren } from 'react';
import { BrainCircuit } from 'lucide-react';
import { Routes } from '@/constants/routes';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href={Routes.HOME} className="flex items-center gap-2 font-medium">
            <div className="flex p-2 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BrainCircuit className="size-[18px]" />
            </div>
            <span className="text-lg">Questly</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* TODO: Replace with app screenshot */}
        <img
          src="/section.png"
          alt="Image"
          className="absolute inset-0 h-full p-5 shadow-lg rounded-lg w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
