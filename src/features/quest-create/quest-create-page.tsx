'use client'

import React from 'react';
import Header from './components/header';
import PostForm from './components/post-form';
import Stepper from '@/components/common/stepper';



const QuestCreatePage = () => {
  return (
    <div className="min-h-screen py-16 container">
      <Header />
      <div className='max-w-xl m-auto py-6'>
        <Stepper currentStep={1} />
      </div>
      <PostForm />
    </div>
  );
};

export default QuestCreatePage;
