'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Timer } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  type: 'single' | 'multiple' | 'text' | 'map';
  options?: string[];
  image?: string;
  timeLimit: number;
}

interface QuestTaskModalProps {
  task: Task;
  onSubmit: (answer: any) => void;
  children: React.ReactNode;
}

const QuestTaskModal: React.FC<QuestTaskModalProps> = ({
  task,
  onSubmit,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState<any>(null);
  const [mapPoint, setMapPoint] = useState<{ x: string; y: string } | null>(
    null,
  );
  const [remainingTime, setRemainingTime] = useState(task.timeLimit);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Handle different types of answers
  const handleAnswer = (value: any) => {
    setAnswer(value);
  };

  // Handle map click
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2);
    setMapPoint({ x, y });
  };

  // Render different task types
  const renderTaskContent = () => {
    switch (task.type) {
      case 'single':
        return (
          <RadioGroup onValueChange={handleAnswer} className="space-y-3">
            {task.options?.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'multiple':
        return (
          <div className="space-y-3">
            {task.options?.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
              >
                <Checkbox
                  id={option}
                  onCheckedChange={(checked) => {
                    const newAnswer = answer || [];
                    if (checked) {
                      handleAnswer([...newAnswer, option]);
                    } else {
                      handleAnswer(
                        newAnswer.filter((item: string) => item !== option),
                      );
                    }
                  }}
                />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <div className="space-y-3">
            <Label htmlFor="answer">Your Answer</Label>
            <Input
              id="answer"
              placeholder="Type your answer here..."
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full"
            />
          </div>
        );

      case 'map':
        return (
          <div className="space-y-3">
            <div
              className="relative w-full h-64 border rounded-lg overflow-hidden cursor-crosshair"
              onClick={handleMapClick}
            >
              <img
                src={task.image || '/placeholder.svg'}
                alt="Quest Map"
                className="w-full h-full object-cover"
              />
              {mapPoint && (
                <div
                  className="absolute w-6 h-6 -ml-3 -mt-3 text-red-500"
                  style={{ left: `${mapPoint.x}%`, top: `${mapPoint.y}%` }}
                >
                  <MapPin className="w-full h-full" />
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Click on the map to mark your answer
            </div>
          </div>
        );

      default:
        return <div>Unsupported task type</div>;
    }
  };

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onClick: handleOpen,
      })}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{task.title}</span>
              <div className="flex items-center gap-2 text-sm font-normal">
                <Timer className="w-4 h-4" />
                <span>
                  {Math.floor(remainingTime / 60)}:
                  {(remainingTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Task Description */}
            <div className="text-gray-700">{task.description}</div>

            {/* Task Content */}
            <div className="bg-gray-50 p-4 rounded-lg">
              {renderTaskContent()}
            </div>

            {/* Hints or Additional Info */}
            <div className="text-sm text-gray-500">
              Tip: Take your time to consider all options carefully.
            </div>
          </div>

          <DialogFooter className="flex justify-between items-center">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSubmit(answer);
                handleClose();
              }}
            >
              Submit Answer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestTaskModal;
