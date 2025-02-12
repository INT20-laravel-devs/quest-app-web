'use client';
import useAuthStore from '@/store/use-auth-store';

import { FC } from 'react';
import UpdateForm from './components/update-form';
import { Hero } from '@/components/common/hero';
import { Cta } from '@/components/common/cta';

const ProfilePage: FC = () => {
  const { user } = useAuthStore();

  return (
    <>
      <Hero
        badge="Account Details"
        heading={`Hello! ${user?.nickname || ""}`}
        features={[]}
        imageSrc="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt="Laptop and hands"
      />
      <div className="container max-w-5xl ">
        <div className="px-4 grid gap-12 md:grid-cols-[1fr,400px] items-center">
          <Cta />
          {user && 
          <UpdateForm user={user} />}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
