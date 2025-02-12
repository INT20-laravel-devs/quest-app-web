'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/styles-utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FormStepper from '@/features/quests/components/form-stepper';
import { TaskType } from '@/types/quests';

type FormData = {
  name: string;
  description: string;
  timeLimit?: number;
  image?: FileList;
};

type Task = {
  description: string;
  type: string;
  answers: { text: string; isCorrect: boolean }[];
};

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>({
    description: '',
    type: 'single',
    answers: [
      { text: '', isCorrect: true },
      { text: '', isCorrect: true },
    ],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log({ ...data, tasks });
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedImage(URL.createObjectURL(file));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddTask = () => {
    setTasks([...tasks, currentTask]);
    setCurrentTask({
      description: '',
      type: TaskType.SINGLE,
      answers: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: true },
      ],
    });
  };

  const handleSaveQuest = () => {
    if (currentTask.description) {
      handleAddTask();
    }
    setStep(3);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <FormStepper
        currentStep={step}
        steps={['General', 'Quests', 'Results']}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={cn(
                'border-2 h-full rounded-lg transition-colors grid place-items-center relative',
                dragActive ? 'border-primary' : 'border-muted',
                !uploadedImage ? 'p-6 border-dashed' : '',
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              {uploadedImage ? (
                <div className="relative aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={uploadedImage || '/placeholder.svg'}
                    alt="Uploaded preview"
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your image here or click to select
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Quest name</Label>
                <Input
                  id="name"
                  {...register('name', { required: true })}
                  placeholder="Enter quest name"
                  className="mt-1"
                />
                {errors.name && (
                  <span className="text-sm text-destructive">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="description">Quest Description</Label>
                <Textarea
                  id="description"
                  {...register('description', { required: true })}
                  placeholder="Enter quest description"
                  className="mt-1"
                  rows={4}
                />
                {errors.description && (
                  <span className="text-sm text-destructive">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="timeLimit">
                  Time Limit in minutes (optional)
                </Label>
                <Input
                  id="timeLimit"
                  type="number"
                  {...register('timeLimit')}
                  placeholder="Set time limit"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Quest Tasks</h2>
              <p className="text-muted-foreground">Add tasks for your quest</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Task {tasks.length + 1} Description</Label>
                  <Input
                    value={currentTask.description}
                    onChange={(e) =>
                      setCurrentTask({
                        ...currentTask,
                        description: e.target.value,
                      })
                    }
                    placeholder="Add text, photo, video"
                  />
                </div>

                <div>
                  <Label>Task {tasks.length + 1} Type</Label>
                  <div className="flex gap-2">
                    <Select
                      value={currentTask.type}
                      onValueChange={(value) =>
                        setCurrentTask({
                          ...currentTask,
                          type: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single answer</SelectItem>
                        <SelectItem value="multiple">
                          Multiple choice
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {currentTask.answers.map((answer, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        value={answer.text}
                        onChange={(e) => {
                          const newAnswers = [...currentTask.answers];
                          newAnswers[index].text = e.target.value;
                          setCurrentTask({
                            ...currentTask,
                            answers: newAnswers,
                          });
                        }}
                        placeholder="Add text, photo, video"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground pt-2">
                      Correct
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-medium">Task {index + 1}</h3>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={handleSaveQuest}>
                Save Quest
              </Button>
              <Button type="button" onClick={handleAddTask}>
                Add Task
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold">Summary</h3>
            <p className="text-muted-foreground">
              Your quest has been created successfully with {tasks.length}{' '}
              tasks!
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="flex justify-end pt-4">
            <Button type="submit">Next</Button>
          </div>
        )}
      </form>
    </div>
  );
}
