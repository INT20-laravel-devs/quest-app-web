import { type CreateTaskBody, TaskType } from '@/types/quests';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { taskTypes } from '@/constants/tasks';
import { deleteTask } from '@/api/quests';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useState } from 'react';

interface TaskListProps {
  tasks: CreateTaskBody[];
  setTasks: (tasks: CreateTaskBody[]) => void;
}

const getTaskTypeContent = (type: TaskType) =>
  taskTypes.find((t) => t.type === type);

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  const [isLoading, setIsLoading] = useState(false);
  if (!tasks || tasks?.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">No tasks created yet</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => {
        const taskTypeContent = getTaskTypeContent(task.type);
        const TaskIcon = taskTypeContent?.icon;
        return (
          <Card
            key={task.id}
            className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow"
          >
            {/*TODO: Fix this when BE will be fixed*/}
            {/*{task.imageLink && (*/}
            {/*  <div className="relative h-48 overflow-hidden">*/}
            {/*    <Image*/}
            {/*      src={task.imageLink || '/placeholder.svg'}*/}
            {/*      alt={task.title}*/}
            {/*      fill*/}
            {/*      className="object-cover transition-transform group-hover:scale-105"*/}
            {/*    />*/}
            {/*    {task.coordinate && (*/}
            {/*      <div*/}
            {/*        className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"*/}
            {/*        style={{*/}
            {/*          left: `${task.coordinate.x * 100}%`,*/}
            {/*          top: `${task.coordinate.y * 100}%`,*/}
            {/*        }}*/}
            {/*      />*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*)}*/}
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center gap-1">
                  {TaskIcon && <TaskIcon size={12} />}
                  <span>{taskTypeContent?.title}</span>
                </Badge>
                <Badge variant="secondary">{task.points} points</Badge>
              </div>
              <h3 className="font-semibold text-xl pt-3 leading-none tracking-tight">
                {task.title}
              </h3>
              <p className="text-muted-foreground">{task.description}</p>
            </CardHeader>
            <CardFooter className="mt-auto">
              {task.type === TaskType.SINGLE && task.variants && (
                <div className="w-full space-y-2">
                  <p className="text-sm font-medium">Single choice options:</p>
                  <ul className="space-y-1">
                    {task.variants.map((v, i) => (
                      <li
                        key={i}
                        className={`text-sm ${v.isCorrect ? 'text-green-600 font-medium' : ''}`}
                      >
                        • {v.content} {v.isCorrect && '✓'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {task.type === TaskType.MULTIPLE && task.variants && (
                <div className="w-full space-y-2">
                  <p className="text-sm font-medium">
                    Multiple choice options:
                  </p>
                  <ul className="space-y-1">
                    {task.variants.map((v, i) => (
                      <li
                        key={i}
                        className={`text-sm ${v.isCorrect ? 'text-green-600 font-medium' : ''}`}
                      >
                        • {v.content} {v.isCorrect && '✓'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {task.type === TaskType.OPEN && (
                <div className="w-full">
                  <p className="text-sm font-medium">Correct answer:</p>
                  <p className="text-sm text-green-600">
                    {task.variants?.at(0)?.content}
                  </p>
                </div>
              )}
              {task.type === TaskType.LOCATION && task.coordinate && (
                <div className="w-full">
                  <p className="text-sm font-medium">Location:</p>
                  <p className="text-sm text-green-600">
                    {task.coordinate.x}, {task.coordinate.y}
                  </p>
                </div>
              )}
              <Button
                disabled={isLoading}
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(task.id)}
              >
                <Trash size={16} />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
