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
import RoundType from './components/round-type';
import TaskContent, { MediaFile } from './components/task-content';
import TaskSelected from './components/tast-selected';

export enum RoundPlayType {
  Open = 'open',
  Test = 'test',
  Geolocation = 'geolocation',
  Single = 'single',
  Image = 'image',
  None = '',
}

export interface MediaContent {
  url?: string;
  type: string;
  content: string | File | null;
}

export interface TaskMedia {
  mediaContent: string | File | null;
  mediaType: string;
  additionalMedia: MediaContent[];
  image: MediaFile | null;
  videoUrl: string;
}

export interface TaskOption {
  text: string;
  isCorrect: boolean;
}

export interface RoundData {
  title: string;
  roundType: RoundPlayType;
  task: TaskMedia;
  timeLimit: string;
  question: string;
  description: string;
  sampleAnswer: string;
  options: TaskOption[];
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
// Total number of steps in your flow
const TOTAL_STEPS = 5;

// Initial form state
const INITIAL_FORM_STATE: RoundData = {
  title: '',
  roundType: RoundPlayType.None,
  task: {
    mediaContent: null,
    mediaType: '',
    additionalMedia: [],
    image: null,
    videoUrl: '',
  },
  timeLimit: '',
  description: '',
  question: '',
  sampleAnswer: '',
  options: [],
};

const RoundCreatePage: FC = () => {
  const [formData, setFormData] = useState<RoundData>(INITIAL_FORM_STATE);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  /**
   * Validate the form for the current step.
   * Returns true if the step is valid; false otherwise.
   */
  const validateStep = (step: number): boolean => {
    switch (step) {
      // Step 1: Require roundType selection
      case 1:
        return formData.roundType !== RoundPlayType.None;

      // Step 2: Varies by roundType
      case 2:
        if (formData.roundType === RoundPlayType.Open) {
          return formData.question.trim() !== '';
        }
        if (
          [RoundPlayType.Test, RoundPlayType.Single].includes(
            formData.roundType,
          )
        ) {
          return (
            formData.options.length >= 2 &&
            formData.options.some((opt) => opt.isCorrect)
          );
        }
        return true;

      case 3:
        return (
          formData.title.trim() !== '' &&
          formData.description.trim() !== ''
          // (formData.task.mediaContent !== null ||
          //   formData.task.additionalMedia.length > 0)
        );

      case 4:
        return (
          formData.timeLimit.trim() !== ''
        )

      default:
        return false;
    }
  };


  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      try {
        await handleSubmit();
        router.push(Routes.QUEST_CREATE);
      } catch (error) {
        console.error('Failed to create round:', error);
      }
    }
  };


  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else {
      //   onCancel();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push(Routes.QUEST_CREATE);
    }
  };


  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();

    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('roundType', formData.roundType);
    formDataToSubmit.append('question', formData.question);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('timeLimit', formData.timeLimit);
    formDataToSubmit.append('sampleAnswer', formData.sampleAnswer);

    // If there are options, store them as JSON
    if (formData.options.length > 0) {
      formDataToSubmit.append('options', JSON.stringify(formData.options));
    }

    // Media content
    if (formData.task.mediaContent instanceof File) {
      formDataToSubmit.append('mediaContent', formData.task.mediaContent);
    }

    // Additional media
    formData.task.additionalMedia.forEach((media, index) => {
      if (media.content instanceof File) {
        formDataToSubmit.append(`additionalMedia_${index}`, media.content);
      }
    });

    // Example fetch (uncomment and adjust to match your API)
    /*
    await fetch('/api/rounds', {
      method: 'POST',
      body: formDataToSubmit,
    });
    */
  };

  /**
   * Render the content for the current step.
   */
  const renderStepContent = () => {
    switch (currentStep) {
      // Step 1: Select round type
      case 1:
        return <RoundType formData={formData} setFormData={setFormData} />;

      // Step 2: Configure question logic or options
      case 2:
        return (
          <TaskSelected
            roundType={formData.roundType}
            formData={formData}
            setFormData={setFormData}
          />
        );

      // Step 3: Title, description, and media content
      case 3:
        return <TaskContent formData={formData} setFormData={setFormData} />;

      // Step 4: Review info (time limit, points, etc.)
      case 4:
        return (
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Review and Confirm</h2>
            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Type:</strong> {formData.roundType}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              {formData.timeLimit && (
              <p>
                <strong>Time Limit:</strong> {formData.timeLimit} minutes
              </p>)}
              {formData.options.length > 0 && (
                <div>
                  <strong>Options:</strong>
                  <ul className="list-disc pl-6 mt-2">
                    {formData.options.map((option, index) => (
                      <li
                        key={index}
                        className={option.isCorrect ? 'text-green-600' : ''}
                      >
                        {option.text} {option.isCorrect && '(Correct)'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      // Step 5 is the final submission (no separate UI)
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-16 container">
      <div className="max-w-xl m-auto py-6">
        {/* Example Stepper usage: pass in currentStep */}
        <Stepper currentStep={2} />
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="border bg-background/50 backdrop-blur-sm">
          {renderStepContent()}

          {/* Navigation buttons */}
          <div className="p-6 border-t flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button onClick={handleNext} disabled={!validateStep(currentStep)}>
              {currentStep === TOTAL_STEPS ? 'Create Round' : 'Next'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoundCreatePage;
