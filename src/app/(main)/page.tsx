'use client';

import HeroSection from '@/features/hero/hero';

const Main = () => {
  return (
    <HeroSection
      title="Create New Quest"
      userRole="Player"
      subtitle="Start your adventure by creating a new quest"
      buttonText="Start Quest"
      onButtonClick={() => console.log('TEST')}
    />
  );
};

export default Main;
