'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Routes } from '@/constants/routes';
import { cn } from '@/utils/styles-utils';
import QuestTaskModal, {
  Task,
} from '@/features/quests/components/quest-task-modal';
import { useResultStore } from '@/store/useResultsStore';
import { useRouter } from 'next/navigation';
import { createParticipation } from '@/api/participation';
import useAuthStore from '@/store/use-auth-store';

interface QuestTasksProps {
  questId: string;
  data: Task[];
  startTime: Date;
  durationMinutes: number;
}

interface Participation {
  userId: string;
  questId: string;
  points: number;
  timeSpent: number;
  correctAnswers: number;
}

function sameSets(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false;
  for (const val of a) {
    if (!b.has(val)) return false;
  }
  return true;
}

const QuestTasks: React.FC<QuestTasksProps> = ({
  questId,
  data,
  startTime,
  durationMinutes,
}) => {
  const [remainingTime, setRemainingTime] = useState(durationMinutes * 60);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { results, setResult } = useResultStore();
  const { user } = useAuthStore();
  const userId = user?.id;

  useEffect(() => {
    setTasks(data);
  }, [data]);

  useEffect(() => {
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
    const timer = setInterval(() => {
      const now = new Date();
      const timeLeft = Math.max(
        0,
        Math.floor((endTime.getTime() - now.getTime()) / 1000),
      );
      setRemainingTime(timeLeft);
      if (timeLeft === 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, durationMinutes]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const isCompletedQuest = completedTasks === totalTasks;

  const handleSubmit = (taskId: string | number, answer: any) => {
    const taskIdStr = String(taskId);
    setTasks((prev) =>
      prev.map((t) => (t.id === taskIdStr ? { ...t, completed: true } : t)),
    );
    setResult(taskIdStr, answer);
  };

  const evaluateTaskResults = () => {
    let correctCount = 0;

    tasks.forEach((task) => {
      const userAnswer = results[task.id];
      let isCorrect = false;

      if (!userAnswer) return;

      switch (task.type) {
        case 'SINGLE': {
          const chosenVariant = task.variants?.find((v) => v.id === userAnswer);
          isCorrect = chosenVariant?.isCorrect ?? false;
          break;
        }
        case 'MULTIPLE': {
          const correctIds = task.variants
            .filter((v) => v.isCorrect)
            .map((v) => v.id);
          const userIds = Array.isArray(userAnswer) ? userAnswer : [];
          isCorrect = sameSets(new Set(correctIds), new Set(userIds));
          break;
        }
        case 'OPEN': {
          const correctVariant = task.variants?.find((v) => v.isCorrect);
          isCorrect = correctVariant?.content === userAnswer;
          break;
        }
        case 'IMAGE':
        case 'MAP': {
          if (!task.coordinate) return;
          const { x, y } = userAnswer || {};
          isCorrect = x === task.coordinate.x && y === task.coordinate.y;
          break;
        }
      }

      if (isCorrect) {
        correctCount++;
      }
    });

    return correctCount;
  };

  const handleCompleteQuest = async () => {
    try {
      setIsSubmitting(true);

      // Calculate time spent in seconds
      const endTime = new Date();
      const timeSpent = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000,
      );

      // Calculate correct answers and points
      const correctAnswers = evaluateTaskResults();
      const points = correctAnswers * 10; // Assuming each correct answer is worth 10 points

      const participationData: Participation = {
        userId,
        questId,
        points,
        timeSpent,
        correctAnswers,
      };
      await createParticipation(participationData);

      router.push(Routes.QUEST.replace('[id]', questId));
    } catch (error) {
      console.error('Failed to submit participation:', error);
    } finally {
      setIsSubmitting(false);
    }
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

        <div className="flex justify-between items-center mt-2">
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
              <div key={task.id} className="grid place-items-center gap-y-2">
                <QuestTaskModal
                  task={{
                    ...task,
                    id: task.id,
                  }}
                  onSubmit={handleSubmit}
                >
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
          {isCompletedQuest ? (
            <Button
              onClick={handleCompleteQuest}
              disabled={isSubmitting}
              className={cn(buttonVariants({ size: 'lg' }), 'font-semibold')}
            >
              {isSubmitting ? 'Submitting...' : 'Complete Quest'}
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestTasks;
