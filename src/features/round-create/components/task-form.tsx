'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus } from 'lucide-react';
import { TaskType } from '@/types/quests';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createTask } from '@/api/quests';
import { ScrollArea } from '@/components/ui/scroll-area';

const variantSchema = z.object({
  content: z.string().min(1, 'Variant content is required'),
  isCorrect: z.boolean().optional(),
});

const taskSchema = z
  .object({
    type: z.nativeEnum(TaskType),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    points: z.number().min(0, 'Points must be a positive number'),
    variant: z.array(variantSchema).optional(),
    coordinate: z
      .object({
        x: z.number(),
        y: z.number(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.type === TaskType.SINGLE || data.type === TaskType.MULTIPLE) {
        return (
          data.variant &&
          data.variant.length >= 2 &&
          data.variant.some((v) => v.isCorrect)
        );
      }
      if (data.type === TaskType.OPEN) {
        return true;
      }
      if (data.type === TaskType.IMAGE) {
        return !!data.coordinate;
      }
      return true;
    },
    {
      message: 'At least two options and one correct answer are required',
      path: ['variant'],
    },
  );

interface TaskFormProps {
  questId: string;
  initialType: TaskType;
  onBack: () => void;
  onSubmit: (task: FormData) => void;
}

export default function TaskForm({
  questId,
  initialType,
  onBack,
  onSubmit,
}: TaskFormProps) {
  const [imageFile, setImageFile] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: initialType,
      title: '',
      description: '',
      points: 0,
      variant:
        initialType === TaskType.SINGLE || initialType === TaskType.MULTIPLE
          ? [
              { content: '', isCorrect: initialType === TaskType.SINGLE },
              { content: '', isCorrect: false },
            ]
          : undefined,
      coordinate: initialType === TaskType.IMAGE ? { x: 0, y: 0 } : undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variant',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setSelectedPoint({ x, y });
    form.setValue('coordinate', { x, y });
  };

  const onSubmitForm = async (data) => {
    const formData = new FormData();

    if (imageFile) {
      formData.append('file', imageFile);
    }

    if (data.type === TaskType.OPEN) {
      data.variant = [{ content: data.variant[0].content, isCorrect: true }];
    }

    const createTaskBody = {
      questId,
      order: 1,
      ...data,
    };

    formData.append('createTask', JSON.stringify(createTaskBody));

    const task = await createTask(formData);

    console.log(task);

    onSubmit(formData);
  };

  const handleAddVariant = () => {
    append({ content: '', isCorrect: false });
  };

  const renderVariantFields = () => {
    if (initialType === TaskType.OPEN) {
      return (
        <div className="space-y-4">
          <Label>Correct Answer</Label>
          <Controller
            name="variant.0.content"
            control={form.control}
            render={({ field }) => (
              <Input {...field} placeholder="Correct answer" />
            )}
          />
        </div>
      );
    }

    if (initialType === TaskType.SINGLE) {
      return (
        <div className="space-y-4">
          <Label>Answer Options</Label>
          <RadioGroup
            value={fields.findIndex((v) => v.isCorrect).toString()}
            onValueChange={(value) => {
              const index = parseInt(value, 10);
              form.setValue(
                'variant',
                fields.map((v, i) => ({
                  ...v,
                  isCorrect: i === index,
                })),
              );
            }}
          >
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`radio-${index}`}
                />
                <Controller
                  name={`variant.${index}.content`}
                  control={form.control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Option content" />
                  )}
                />
                {index > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </RadioGroup>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddVariant}
            className="mt-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </div>
      );
    }

    if (initialType === TaskType.MULTIPLE) {
      return (
        <div className="space-y-4">
          <Label>Answer Options</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Controller
                name={`variant.${index}.isCorrect`}
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Controller
                name={`variant.${index}.content`}
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Option content" />
                )}
              />
              {index > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddVariant}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Option
          </Button>
        </div>
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="space-y-4 px-2"
      >
        <ScrollArea className="max-h-[60vh]">
          <input type="hidden" {...form.register('type')} />
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to task types
          </Button>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {renderVariantFields()}

          {initialType === TaskType.IMAGE && (
            <div className="space-y-2">
              <Label>Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imageFile && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Selected"
                    className="max-w-full h-auto cursor-crosshair"
                    onClick={handleImageClick}
                  />
                  {selectedPoint && (
                    <div
                      className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${selectedPoint?.x * 100}%`,
                        top: `${selectedPoint?.y * 100}%`,
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        <Button type="submit" className="w-full">
          Create Task
        </Button>
      </form>
    </Form>
  );
}
