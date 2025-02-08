import Header from '@/components/common/header';
import { FC } from 'react';
import { cookies } from 'next/headers';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const isLoggedIn = !!cookies().get('jwt');

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {children}
    </>
  );
};

export default MainLayout;
