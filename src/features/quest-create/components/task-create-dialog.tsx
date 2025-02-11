'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { TaskType } from '@/types/quests';
import TaskForm from '@/features/quest-create/components/task-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { taskTypes } from '@/constants/tasks';

interface TaskCreatorDialogProps {
  questId: string;
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: FormData) => void;
}

export default function TaskCreatorDialog({
  questId,
  isOpen,
  onClose,
  onTaskCreated,
}: TaskCreatorDialogProps) {
  const [selectedType, setSelectedType] = useState<TaskType | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80dvh]">
        <DialogHeader className="text-xsl font-semibold">
          Select Task Type
        </DialogHeader>

        {!selectedType ? (
          <ScrollArea className="max-h-[70vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {taskTypes.map((taskType) => (
                <Card
                  key={`${taskType.type}-${taskType.title}`}
                  className="cursor-pointer transition-all hover:scale-[1.02] hover:border-gray-400"
                  onClick={() => setSelectedType(taskType.type)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <taskType.icon className="h-8 w-8 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {taskType.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {taskType.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <TaskForm
            questId={questId}
            initialType={selectedType}
            onBack={() => setSelectedType(null)}
            onSubmit={(task) => {
              onTaskCreated(task);

              setSelectedType(null);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
