'use client';

import { Cta } from '@/components/common/cta';
import EnhancedStepper from '@/components/common/enhanced-stepper';
import { Hero } from '@/components/common/hero';
import ReviewBlock from '../../components/common/reviews';
import { FC } from 'react';

const MainPage: FC = () => {
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
