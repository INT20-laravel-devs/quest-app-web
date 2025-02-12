'use client';

import Header from '@/features/quest-create/components/header';
import FormStepper from '@/features/quests/components/form-stepper';
import { getTasks, publishQuest } from '@/api/quests';
import QuestDashboard from '@/features/quests/components/quest-dashboard';
import { useQuery } from '@tanstack/react-query';
import TaskList from '@/features/quest-create/components/task-list';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Routes } from '@/constants/routes';
import type { CreateTaskBody } from '@/types/quests';
import { useEffect, useState } from 'react';

interface QuestPublishPageProps {
  questId: string;
}

const QuestPublishPage = ({ questId }: QuestPublishPageProps) => {
  const [tasks, setTasks] = useState<CreateTaskBody[]>([]);
  const { replace } = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['tasks', questId],
    queryFn: () => getTasks(questId),
  });

  useEffect(() => {
    if (data && !isLoading && !tasks.length) {
      setTasks(data as CreateTaskBody[]);
    }
  }, [data, isLoading, tasks]);

  const handlePublish = async () => {
    try {
      await publishQuest(questId);
      toast.success('Quest published successfully');
      replace(Routes.QUESTS);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      console.error(e);
    }
  };

  if (!data && !isLoading) return null;

  return (
    <div className="min-h-screen py-16 container">
      <Header />
      <div className="max-w-xl mx-auto py-2">
        <FormStepper steps={['General', 'Tasks', 'Results']} currentStep={3} />
      </div>
      <Card className="max-w-6xl p-6 mx-auto space-y-3">
        <QuestDashboard questId={questId} />
        <h3 className="text-xl pt-3 font-semibold">Quest tasks</h3>
        <TaskList tasks={tasks as CreateTaskBody[]} setTasks={setTasks} />
        <Button onClick={handlePublish} className="self-end">
          Publish
        </Button>
      </Card>
    </div>
  );
};

export default QuestPublishPage;
