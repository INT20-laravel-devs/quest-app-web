'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Routes } from '@/constants/routes';
import { cn } from '@/utils/styles-utils';

// Import your modal and the store
import QuestTaskModal, {
  Task,
} from '@/features/quests/compoents/quest-task-modal';
import { useResultStore } from '@/store/useResultsStore';
import { useRouter } from 'next/navigation';

interface QuestTasksProps {
  questId: string;
  data: Task[]; // Tasks from your backend
  startTime: Date;
  durationMinutes: number;
}

/** Helper to check if two sets have the same members */
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
  const router = useRouter();

  // Pull user answers from Zustand
  const { results, setResult } = useResultStore();

  // 1) On mount, set tasks from the backend
  useEffect(() => {
    setTasks(data);
    console.log('Tasks from backend:', data);
  }, [data]);

  // 2) Basic Timer
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

  // 3) Calculate Progress
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const isCompletedQuest = completedTasks === totalTasks;
  const questHref = Routes.QUEST.replace('[id]', questId);

  // 4) Called from the modal: "Submit Answer" => store the user answer
  const handleSubmit = (taskId: string | number, answer: any) => {
    const taskIdStr = String(taskId); // ensure string if your tasks have a string ID
    console.log('Submitted answer:', { taskId: taskIdStr, answer });

    // Mark local task as completed
    setTasks((prev) =>
      prev.map((t) => (t.id === taskIdStr ? { ...t, completed: true } : t)),
    );

    // Save user answer in Zustand
    setResult(taskIdStr, answer);

    // Check the updated store in console
    console.log('Zustand results now:', useResultStore.getState().results);
    // router.push(questHref);
  };

  /**
   * 5) On "Complete Quest" => For each task, check user answer vs. correct answer
   */
  const handleCompleteQuest = () => {
    tasks.forEach((task) => {
      const userAnswer = results[task.id]; // could be variant ID(s) or text

      // If no answer, automatically "Incorrect"
      if (!userAnswer) {
        console.log(`Task "${task.title}" => No answer => Incorrect!`);
        return;
      }

      // Evaluate correctness based on task.type
      switch (task.type) {
        case 'SINGLE': {
          // userAnswer is e.g. "1660fd0e-0af5-4d25-a53c-4e6fc7163464"
          // We find the variant in task.variants
          const chosenVariant = task.variants?.find((v) => v.id === userAnswer);
          if (chosenVariant?.isCorrect) {
            console.log(`Task "${task.title}" => Correct (SINGLE)!`);
          } else {
            console.log(`Task "${task.title}" => Incorrect (SINGLE)!`);
          }
          break;
        }

        case 'MULTIPLE': {
          // userAnswer is an array of variant IDs
          // We'll compare sets: the set of correct variant IDs vs. user's chosen IDs
          const correctIds = task.variants
            .filter((v) => v.isCorrect)
            .map((v) => v.id);
          const userIds = Array.isArray(userAnswer) ? userAnswer : [];

          if (sameSets(new Set(correctIds), new Set(userIds))) {
            console.log(`Task "${task.title}" => Correct (MULTIPLE)!`);
          } else {
            console.log(`Task "${task.title}" => Incorrect (MULTIPLE)!`);
          }
          break;
        }

        case 'OPEN': {
          // userAnswer is typed text
          // For simplicity, let's assume there's exactly one variant with isCorrect = true
          // and its content must match the userAnswer
          const correctVariant = task.variants?.find((v) => v.isCorrect);

          if (correctVariant && correctVariant.content === userAnswer) {
            console.log(`Task "${task.title}" => Correct (OPEN)!`);
          } else {
            console.log(`Task "${task.title}" => Incorrect (OPEN)!`);
          }
          break;
        }

        case 'IMAGE':
        case 'MAP': {
          // userAnswer might be { x, y }
          // Suppose the correct coordinate is stored in coordinate.x, coordinate.y, etc.
          // We'll do a simple distance check or exact match
          if (!task.coordinate) {
            console.log(`Task "${task.title}" => No coordinate => Can't check`);
            return;
          }

          // Example: treat userAnswer coords == coordinate.x,y as "correct"
          const { x, y } = userAnswer || {};
          if (x === task.coordinate.x && y === task.coordinate.y) {
            console.log(`Task "${task.title}" => Correct (MAP/IMAGE)!`);
          } else {
            console.log(`Task "${task.title}" => Incorrect (MAP/IMAGE)!`);
          }
          break;
        }

        default:
          console.log(`Task "${task.title}" => Unknown type => Can't check`);
      }
    });

    // Then optionally, navigate or do something else
    console.log('Done checking all tasks!');
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
              // Use key={task.id}, the UUID from backend
              <div key={task.id} className="grid place-items-center gap-y-2">
                {/* Pass the string-based ID to the modal */}
                <QuestTaskModal
                  task={{
                    ...task,
                    // If your modal expects a numeric ID, convert or unify
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
              className={cn(buttonVariants({ size: 'lg' }), 'font-semibold')}
            >
              Complete Quest
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestTasks;
