'use client';

import { BrainCircuit, Menu } from 'lucide-react';
import { HeaderRoutes, Routes } from '@/constants/routes';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import UserInfo from '@/components/common/user-info';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="w-full border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl m-auto">
        <Link className="flex items-center gap-3" href={Routes.HOME} passHref>
          <div className="flex p-2 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BrainCircuit className="size-[18px]" />
          </div>
          <span className="text-lg font-medium">Questly</span>
        </Link>

        {isMobile ? (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col items-center gap-4 mt-6">
                {HeaderRoutes.map(({ name, route }) => (
                  <Link
                    className="px-2 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                    key={name}
                    href={route}
                    onClick={closeSheet}
                  >
                    {name}
                  </Link>
                ))}
              </nav>
              <div className="mt-6" onClick={closeSheet}>
                <UserInfo isLoggedIn={isLoggedIn} />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
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
            <UserInfo isLoggedIn={isLoggedIn} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
