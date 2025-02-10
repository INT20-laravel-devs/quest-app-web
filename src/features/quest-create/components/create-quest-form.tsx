import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { Routes } from '@/constants/routes';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/styles-utils';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateQuestBody, createQuestSchema } from '@/types/quests';
import { createQuest } from '@/api/quests';
import { toast } from 'sonner';

interface CreateQuestFormProps {
  onNext?: () => void;
  onCancel?: () => void;
}

const CreateQuestForm: FC<CreateQuestFormProps> = ({
  onNext = () => console.log('Next with data:'),
  onCancel = () => console.log('Cancelled'),
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateQuestBody>({
    resolver: zodResolver(createQuestSchema),
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedImage(URL.createObjectURL(file));
        setImageError(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
      setImageError(null);
    }
  };

  const onSubmit = async (data: CreateQuestBody) => {
    // if (!uploadedImage) {
    //   setImageError('Image is required');
    //   return;
    // }
    try {
      await createQuest(data);
      onNext();
      router.push(Routes.ROUND_CREATE);
      toast.success('Quest created successfully');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      console.error(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-xl border bg-background/50 backdrop-blur-sm p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={cn(
                'border-2 cursor-pointer h-full rounded-lg transition-colors grid place-items-center relative',
                dragActive ? 'border-primary' : 'border-muted',
                !uploadedImage ? 'p-6 border-dashed' : '',
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              {uploadedImage ? (
                <div className="relative aspect-video">
                  <img
                    src={uploadedImage || '/placeholder.svg'}
                    alt="Uploaded preview"
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your image here or click to select
                  </p>
                </div>
              )}
              {imageError && (
                <span className="text-sm text-destructive">{imageError}</span>
              )}
            </div>

            <div className="space-y-4">
              <Input
                id="title"
                label="Quest name"
                {...register('title', { required: true })}
                placeholder="Enter quest name"
                className="mt-1"
                error={errors.title?.message}
              />

              <Textarea
                id="description"
                label="Quest Description"
                {...register('description', { required: true })}
                placeholder="Enter quest description"
                className="mt-1"
                rows={4}
                error={errors.description?.message}
              />

              <Input
                id="timeLimit"
                label="Time Limit in minutes (optional)"
                type="number"
                inputMode="numeric"
                {...register('timeLimit', { valueAsNumber: true })}
                placeholder="Set time limit"
                className="mt-1"
                error={errors.timeLimit?.message}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestForm;
