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
import { MapPin } from 'lucide-react';
import { TaskType } from '@/types/quests';

export interface Task {
  id: number;
  title: string;
  description: string;
  type: TaskType;
  options?: string[];
  image?: string;
  completed: boolean;
}

interface QuestTaskModalProps {
  task: Task;
  onSubmit: (taskId: number, answer: any) => void;
  children: React.ReactNode;
}

const QuestTaskModal: React.FC<QuestTaskModalProps> = ({
  task,
  onSubmit,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState<any>(null);
  const [imagePoint, setImagePoint] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleAnswer = (value: any) => {
    console.log(answer);
    setAnswer(value);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setImagePoint({ x, y });
    setAnswer({ x, y });
  };

  const renderTaskContent = () => {
    switch (task.type) {
      case TaskType.SINGLE:
        return (
          <RadioGroup
            onValueChange={(value) => handleAnswer(value)}
            value={answer}
            className="space-y-3"
          >
            {task.variants?.map((variant: Variant) => (
              <div
                key={variant.id}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
              >
                <RadioGroupItem value={variant.id} id={variant.id} />
                <Label htmlFor={variant.id}>{variant.content}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case TaskType.MULTIPLE:
        return (
          <div className="space-y-3">
            {task.variants?.map((variant: Variant) => (
              <div
                key={variant.id}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
              >
                <Checkbox
                  id={variant.id}
                  onCheckedChange={(checked) => {
                    const newAnswer = answer || [];
                    if (checked) {
                      handleAnswer([...newAnswer, variant.id]);
                    } else {
                      handleAnswer(
                        newAnswer.filter(
                          (selectedId: string) => selectedId !== variant.id,
                        ),
                      );
                    }
                  }}
                  checked={answer?.includes(variant.id)}
                />
                <Label htmlFor={variant.id}>{variant.content}</Label>
              </div>
            ))}
          </div>
        );
      case TaskType.OPEN:
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

      case TaskType.IMAGE:
      case TaskType.MAP:
        return (
          <div className="space-y-3">
            <div
              className="relative w-full h-64 border rounded-lg overflow-hidden cursor-crosshair"
              onClick={handleImageClick}
            >
              <img
                src={task.image || '/placeholder.svg?height=256&width=512'}
                alt="Task Image"
                className="w-full h-full object-cover"
              />
              {imagePoint && (
                <div
                  className="absolute w-6 h-6 -ml-3 -mt-3 text-red-500"
                  style={{
                    left: `${imagePoint.x}px`,
                    top: `${imagePoint.y}px`,
                  }}
                >
                  <MapPin className="w-full h-full" />
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Click on the image to mark your answer
            </div>
            {imagePoint && (
              <div className="text-sm text-gray-500">
                Selected coordinates: ({imagePoint.x}, {imagePoint.y})
              </div>
            )}
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
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-gray-700">{task.description}</div>
            <div className="bg-gray-50 p-4 rounded-lg">
              {renderTaskContent()}
            </div>
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
                onSubmit(task.id, answer);
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
