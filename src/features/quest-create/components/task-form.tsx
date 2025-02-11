'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import 'react-image-crop/dist/ReactCrop.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactCrop, { Crop } from 'react-image-crop';
import { createTask } from '@/api/quests';

const variantSchema = z.object({
  content: z.string().min(1, 'Variant content is required'),
  isCorrect: z.boolean().default(false),
});

const coordinateSchema = z.object({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  endX: z.number().min(0).max(1),
  endY: z.number().min(0).max(1),
});

const taskSchema = z
  .object({
    type: z.nativeEnum(TaskType),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    points: z.number().min(0, 'Points must be a positive number'),
    variant: z.array(variantSchema).optional(),
    coordinate: coordinateSchema.optional(),
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
      return true;
    },
    {
      message: 'At least two options and one correct answer are required',
      path: ['variant'],
    },
  );

type TaskFormData = z.infer<typeof taskSchema>;

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

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
      coordinate:
        initialType === TaskType.IMAGE
          ? { x: 0, y: 0, endX: 0, endY: 0 }
          : undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variant',
  });

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImageUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setCrop({
        unit: '%',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });
      form.setValue('coordinate', { x: 0, y: 0, endX: 0, endY: 0 });
    }
  };

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop);
    form.setValue('coordinate', {
      x: newCrop.x / 100,
      y: newCrop.y / 100,
      endX: (newCrop.x + newCrop.width) / 100,
      endY: (newCrop.y + newCrop.height) / 100,
    });
  };

  const onSubmitForm = async (data: TaskFormData) => {
    const formData = new FormData();

    if (imageFile) {
      formData.append('file', imageFile);
    }

    if (data.type === TaskType.OPEN) {
      data.variant = [
        { content: data?.variant?.at(0)?.content as string, isCorrect: true },
      ];
    }

    const createTaskBody = {
      questId,
      order: 1,
      ...data,
    };

    console.log(imageFile);

    formData.append('createTask', JSON.stringify(createTaskBody));

    try {
      const task = await createTask(formData);
      console.log('Created task:', task);
      onSubmit(formData);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleAddVariant = () => {
    append({ content: '', isCorrect: false });
  };

  const renderVariantFields = () => {
    if (initialType === TaskType.OPEN) {
      return (
        <FormField
          control={form.control}
          name="variant.0.content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Answer</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Correct answer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    if (initialType === TaskType.SINGLE) {
      return (
        <div className="space-y-4">
          <Label>Answer Options</Label>
          <RadioGroup
            value={fields.findIndex((v) => v.isCorrect)?.toString() || '0'}
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
                <FormField
                  control={form.control}
                  name={`variant.${index}.content`}
                  render={({ field }) => (
                    <FormControl>
                      <Input {...field} placeholder="Option content" />
                    </FormControl>
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
              <FormField
                control={form.control}
                name={`variant.${index}.isCorrect`}
                render={({ field }) => (
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name={`variant.${index}.content`}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} placeholder="Option content" />
                  </FormControl>
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
    <ScrollArea className="max-h-[60vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="space-y-4 mx-2"
        >
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
              {imageFile && imageUrl && (
                <div className="relative mt-2">
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => handleCropChange(percentCrop)}
                  >
                    <img
                      src={imageUrl}
                      alt="Selected"
                      className="max-w-full h-auto"
                    />
                  </ReactCrop>
                </div>
              )}
            </div>
          )}
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
