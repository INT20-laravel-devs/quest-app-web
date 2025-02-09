import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Routes } from '@/constants/routes';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  onNext?: () => void;
  onCancel?: () => void;
}

const PostForm: FC<PostFormProps> = ({
  onNext = () => console.log('Next with data:'),
  onCancel = () => console.log('Cancelled'),
}) => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    timeLimit: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
    router.push(Routes.ROUND_CREATE);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-xl border bg-background/50 backdrop-blur-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Quest Title
            </label>
            <Input
              id="title"
              placeholder="Enter your quest title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Quest Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe your quest"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="min-h-[150px] w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="timeLimit"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Time Limit (minutes)
            </label>
            <Input
              id="timeLimit"
              type="number"
              placeholder="Enter time limit in minutes"
              value={formData.timeLimit}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, timeLimit: e.target.value }))
              }
              min="1"
              className="w-full"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-24"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-24">
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
