'use client';

import { FC } from 'react';
import HeroSection from '@/features/hero/hero';
import UpdateForm from './components/update-form';

const ProfilePage: FC = () => {
  return (
    <>
      <HeroSection
        title="User123"
        userRole="Player"
        subtitle="Update your account information"
      />
      <div className="max-w-6xl mx-auto py-6 px-8">
        <UpdateForm />
      </div>
    </>
  );
};

export default ProfilePage;
