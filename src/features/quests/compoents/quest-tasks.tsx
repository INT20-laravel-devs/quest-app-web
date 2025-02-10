'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Routes } from '@/constants/routes';
import Link from 'next/link';
import { cn } from '@/utils/styles-utils';
import { useEffect, useState } from 'react';
import QuestTaskModal from '@/features/quests/compoents/quest-task-modal';

const tasksMock = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: true,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: true,
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: false,
  },
  {
    id: 4,
    title: 'Task 4',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: false,
  },
  {
    id: 5,
    title: 'Task 5',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: false,
  },
  {
    id: 6,
    title: 'Task 6',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: false,
  },
  {
    id: 7,
    title: 'Task 7',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: false,
  },
  {
    id: 8,
    title: 'Task 8',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: false,
  },
  {
    id: 9,
    title: 'Task 9',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: false,
  },
  {
    id: 10,
    title: 'Task 10',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    completed: false,
  },
];

interface QuestTasksProps {
  questId: string;
  startTime: Date;
  durationMinutes: number;
}

const QuestTasks = ({
  questId,
  startTime,
  durationMinutes,
}: QuestTasksProps) => {
  const [remainingTime, setRemainingTime] = useState(durationMinutes * 60);

  useEffect(() => {
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
    const timer = setInterval(() => {
      const now = new Date();
      const timeLeft = Math.max(
        0,
        Math.floor((endTime.getTime() - now.getTime()) / 1000),
      );
      setRemainingTime(timeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, durationMinutes]);

  const completedTasks = tasksMock.filter((task) => task.completed).length;
  const totalTasks = tasksMock.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const isCompletedQuest = completedTasks === totalTasks;
  const questHref = Routes.QUEST.replace('[id]', questId);

  const task1 = {
    id: 1,
    title: 'Ancient Riddle',
    description: 'Complete the following challenge to progress in your quest.',
    type: 'single' as const,
    options: ['Forest Path', 'Mountain Trail', 'River Route', 'Cave Entrance'],
    image: '/api/placeholder/600/400',
    timeLimit: 300, // in seconds
  };

  const handleSubmit = (answer: any) => {
    console.log('Submitted answer:', answer);
    // Handle the submitted answer here
  };

  return (
    <Card className="pt-8 w-full">
      <CardContent>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Quest Tasks</h2>
          <span className="text-muted-foreground font-semibold">
            Timer: {Math.floor(remainingTime / 60)}:
            {remainingTime % 60 < 10
              ? `0${remainingTime % 60}`
              : remainingTime % 60}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">
            Progress: {progressPercentage}%
          </span>
          <span className="text-muted-foreground">
            {completedTasks}/{totalTasks} tasks completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <Progress value={progressPercentage} />
        </div>
        <div className="flex flex-wrap justify-center gap-x-20 gap-y-6 mt-6">
          {tasksMock.map((task, index) => {
            const isCompleted = task.completed;
            const isPreviousCompleted = tasksMock[index - 1]?.completed;
            const isDisabled = !isCompleted ? !isPreviousCompleted : true;

            return (
              <div key={index} className="grid place-items-center gap-y-2">
                <QuestTaskModal task={task1} onSubmit={handleSubmit}>
                  <Button
                    variant="ghost"
                    disabled={isDisabled}
                    className={`flex flex-col items-center justify-center border rounded-full w-16 h-16 text-sm font-medium ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isPreviousCompleted
                          ? 'border-primary text-primary cursor-pointer'
                          : 'text-muted-foreground border-muted'
                    }`}
                  >
                    {isCompleted || isPreviousCompleted ? (
                      <span className="text-lg font-bold">{index + 1}</span>
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </Button>
                </QuestTaskModal>
                <span className="text-center text-sm font-medium">
                  {task.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-6">
          {!isCompletedQuest && (
            <Link
              href={questHref}
              className={cn(buttonVariants({ size: 'lg' }), 'font-semibold')}
            >
              Complete
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestTasks;
