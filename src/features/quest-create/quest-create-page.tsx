'use client';

import React from 'react';
import Header from './components/header';
import CreateQuestForm from './components/create-quest-form';
import FormStepper from '@/features/quests/components/form-stepper';

const QuestCreatePage = () => {
  return (
    <div className="min-h-screen py-16 container">
      <Header />
      <div className="max-w-xl m-auto py-2">
        <FormStepper steps={['General', 'Tasks', 'Results']} currentStep={1} />
      </div>
      <CreateQuestForm />
    </div>
  );
};

export default QuestCreatePage;
