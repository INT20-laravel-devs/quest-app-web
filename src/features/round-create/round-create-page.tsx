'use client';

import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import RoundType from './components/round-type';
import TaskContent from './components/task-content';
import TimeLimit from './components/time-limit';
import PointsContent from './components/points-content';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/routes';

export interface RoundData {
  roundType: string;
  task: {
    text: string;
    mediaType: string;
    mediaUrl: string;
  };
  timeLimit: string;
  points: string;
}

export interface RoundTypeProps {
  formData: RoundData;
  setFormData: (data: RoundData) => void;
}

const RoundCreatePage: FC = () => {
  const [formData, setFormData] = useState<RoundData>({
    roundType: '',
    task: {
      text: '',
      mediaType: '',
      mediaUrl: '',
    },
    timeLimit: '',
    points: '',
  });
  const router = useRouter();

  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    // else onSubmit(formData);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else {
      //   onCancel();
      router.push(Routes.QUEST_CREATE);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <RoundType formData={formData} setFormData={setFormData} />;
      case 2:
        return <TaskContent formData={formData} setFormData={setFormData} />;
      case 3:
        return <TimeLimit formData={formData} setFormData={setFormData} />;
      case 4:
        return <PointsContent formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="min-h-screen py-16 container">
      <div className="mb-12 flex flex-col items-center gap-6 text-center">
        <Badge variant="outline" className="animate-fade-in">
          Step {step} of 4
        </Badge>
        <h1 className="text-4xl font-semibold lg:text-5xl bg-gradient-to-r from-[#7c3aed] via-purple-400 to-[#7c3aed] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
          Create New Round
        </h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="border bg-background/50 backdrop-blur-sm">
          {renderStepContent()}

          <div className="p-6 border-t flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.roundType) ||
                (step === 2 && !formData.task.text) ||
                (step === 3 && !formData.timeLimit) ||
                (step === 4 && !formData.points)
              }
            >
              {step === 4 ? 'Create Round' : 'Next'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoundCreatePage;
