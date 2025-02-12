'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Routes } from '@/constants/routes';
import Link from 'next/link';
import { cn } from '@/utils/styles-utils';
import { useEffect, useState } from 'react';
import QuestTaskModal, {
  Task,
} from '@/features/quests/compoents/quest-task-modal';

const tasksMock: Task[] = [
  {
    id: 1,
    title: 'Ancient Riddle',
    description:
      'Solve this riddle to progress: What has keys, but no locks; space, but no room; you can enter, but not go in?',
    type: 'single',
    options: ['A Piano', 'A Keyboard', 'A Map', 'A Book'],
    timeLimit: 120,
    completed: false,
  },
  {
    id: 2,
    title: 'Forest Navigation',
    description:
      'Navigate through the enchanted forest. Choose your path wisely.',
    type: 'map',
    image: '/placeholder.svg?height=256&width=512',
    timeLimit: 180,
    completed: false,
  },
  {
    id: 3,
    title: 'Magical Ingredients',
    description:
      'Select all the ingredients needed for the invisibility potion.',
    type: 'multiple',
    options: [
      'Moonstone',
      'Dragon scales',
      'Unicorn hair',
      'Troll sweat',
      'Phoenix feather',
    ],
    timeLimit: 150,
    completed: false,
  },
  {
    id: 4,
    title: 'Spell Incantation',
    description: 'Write the correct spell incantation to open the sealed door.',
    type: 'text',
    timeLimit: 90,
    completed: false,
  },
  {
    id: 5,
    title: 'Hidden Symbol',
    description: 'Find and click on the hidden magical symbol in the image.',
    type: 'image-point',
    image: '/placeholder.svg?height=256&width=512',
    timeLimit: 120,
    completed: false,
  },
  {
    id: 6,
    title: 'Final Challenge',
    description: 'Choose your final path to claim the treasure.',
    type: 'single',
    options: [
      'The Path of Courage',
      'The Path of Wisdom',
      'The Path of Loyalty',
      'The Path of Power',
    ],
    timeLimit: 240,
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
  const [tasks, setTasks] = useState(tasksMock);

  useEffect(() => {
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
    const timer = setInterval(() => {
      const now = new Date();
      const timeLeft = Math.max(
        0,
        Math.floor((endTime.getTime() - now.getTime()) / 1000),
      );
      setRemainingTime(timeLeft);
      if (timeLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, durationMinutes]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const isCompletedQuest = completedTasks === totalTasks;
  const questHref = Routes.QUEST.replace('[id]', questId);

  const handleSubmit = (taskId: number, answer: unknown) => {
    console.log('Submitted answer for task', taskId, ':', answer);
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task,
      ),
    );
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
            Progress: {progressPercentage.toFixed(0)}%
          </span>
          <span className="text-muted-foreground">
            {completedTasks}/{totalTasks} tasks completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <Progress value={progressPercentage} />
        </div>
        <div className="flex flex-wrap justify-center gap-x-20 gap-y-6 mt-10">
          {tasks.map((task, index) => {
            const isCompleted = task.completed;
            const isPreviousCompleted =
              index === 0 || tasks[index - 1]?.completed;
            const isDisabled = !isCompleted ? !isPreviousCompleted : true;

            return (
              <div key={index} className="grid place-items-center gap-y-2">
                <QuestTaskModal task={task} onSubmit={handleSubmit}>
                  <Button
                    variant="ghost"
                    disabled={isDisabled}
                    className={cn(
                      'flex flex-col items-center justify-center border rounded-full w-16 h-16 text-sm font-medium',
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isPreviousCompleted
                          ? 'border-primary text-primary cursor-pointer'
                          : 'text-muted-foreground border-muted',
                    )}
                  >
                    {isCompleted || isPreviousCompleted ? (
                      <span className="text-lg font-bold">{index + 1}</span>
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </Button>
                </QuestTaskModal>
                <span className="text-center text-sm font-medium">
                  {!task.completed && !isPreviousCompleted
                    ? 'Locked'
                    : task.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-6">
          {isCompletedQuest && (
            <Link
              href={questHref}
              className={cn(buttonVariants({ size: 'lg' }), 'font-semibold')}
            >
              Complete Quest
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestTasks;
