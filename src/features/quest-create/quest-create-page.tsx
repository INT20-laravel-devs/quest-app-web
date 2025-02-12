'use client';

import React from 'react';
import Header from './components/header';
import CreateQuestForm from './components/create-quest-form';
import FormStepper from '@/features/quests/components/form-stepper';

interface QuestCreatePageProps {
  questId: string;
}

const QuestCreatePage = ({ questId }: QuestCreatePageProps) => {
  return (
    <div className="min-h-screen py-16 container">
      <Header />
      <div className="max-w-xl m-auto py-2">
        <FormStepper steps={['General', 'Tasks', 'Results']} currentStep={1} />
      </div>
      <CreateQuestForm questId={questId} />
    </div>
  );
};

export default QuestCreatePage;
