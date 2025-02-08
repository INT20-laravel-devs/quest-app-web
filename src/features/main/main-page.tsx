'use client';

import { Cta } from '@/components/common/cta';
import EnhancedStepper from '@/components/common/enhanced-stepper';
import { Hero } from '@/components/common/hero';
import ReviewBlock from '../../components/common/reviews';
import { FC } from 'react';
import useAuthStore from '@/store/use-auth-store';

const MainPage: FC = () => {
  const user = useAuthStore((state) => state.user);

  console.log(user);
  return (
    <>
      <Hero />
      <Cta />
      <EnhancedStepper />
      <ReviewBlock />
    </>
  );
};

export default MainPage;
