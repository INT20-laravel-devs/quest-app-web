'use client';

import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import RoundType from './components/round-type';
import TaskContent from './components/task-content';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/routes';
import Stepper from '@/components/common/stepper';
import TaskSelected from './components/tast-selected';


export enum RoundPlayType {
  Open = 'open',
  Test = 'test',
  Geolocation = 'geolocation',
  Single = 'single',
  Image = 'image',
  NULL = "",
}

export interface RoundData {
  roundType: RoundPlayType;
  task: {
    mediaContent: string;
    mediaType: string;
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
    roundType: RoundPlayType.NULL,
    task: {
      mediaContent: '',
      mediaType: '',
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
        return (
          <TaskSelected
            roundType={formData.roundType}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return <TaskContent formData={formData} setFormData={setFormData} />;
      case 4:
        return <div>Hello</div>;
    }
  };

  return (
    <div className="min-h-screen py-16 container">
      <div className="max-w-xl m-auto py-6">
        <Stepper currentStep={2} />
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
                (step === 2 && !formData.task.mediaContent) ||
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
