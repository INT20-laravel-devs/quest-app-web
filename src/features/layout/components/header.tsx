'use client';

import { BrainCircuit } from 'lucide-react';
import { HeaderRoutes, Routes } from '@/constants/routes';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <Link className="flex items-center gap-3" href={Routes.HOME} passHref>
          <div className="flex p-2 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BrainCircuit className="size-[18px]" />
          </div>
          <span className="text-xl font-medium">Questly</span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {HeaderRoutes.map(({ name, route }) => (
              <Link
                className="px-2 h-auto text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-transparent"
                key={name}
                href={route}
                passHref
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
