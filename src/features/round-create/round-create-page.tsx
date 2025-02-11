'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreateTaskBody } from '@/types/quests';
import { PlusCircle } from 'lucide-react';
import TaskCreatorDialog from '@/features/round-create/components/task-create-dialog';
import TaskList from '@/features/round-create/components/task-list';
import Header from '@/features/quest-create/components/header';
import FormStepper from '@/features/quests/components/form-stepper';
import { getTasks } from '@/api/quests';

interface RoundCreatePageProps {
  questId: string;
}

const RoundCreatePage = ({ questId }: RoundCreatePageProps) => {
  const [tasks, setTasks] = useState<CreateTaskBody[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTaskCreated = (data: FormData) => {
    const image = data.get('file') as File;
    const task = data.get('createTask') as unknown as CreateTaskBody;

    const newTask = {
      ...task,
      imageLink: image ? URL.createObjectURL(image) : null,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsDialogOpen(false);
  };

  const fetchTasks = async () => {
    const res = await getTasks(questId);

    setTasks(res);
  };

  useEffect(() => {
    fetchTasks();
  }, [questId]);

  return (
    <div className="min-h-screen py-16 px-4 container">
      <Header />
      <div className="max-w-xl mx-auto py-2">
        <FormStepper steps={['General', 'Tasks', 'Results']} currentStep={2} />
      </div>
      <div className="max-w-4xl mx-auto space-y-2">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Task
        </Button>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border bg-background/50 backdrop-blur-sm p-8">
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>

      <TaskCreatorDialog
        questId={questId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default RoundCreatePage;
