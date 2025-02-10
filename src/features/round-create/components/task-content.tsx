import { FC } from 'react';
import { Button } from '@/components/ui/button';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { RoundTypeProps } from '../round-create-page';

export interface MediaFile {
  file: File;
  type: 'image';
  url: string;
}

const TaskContent: FC<RoundTypeProps> = ({ formData, setFormData }) => {
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'image',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const mediaFile: MediaFile = {
      file,
      type,
      url: URL.createObjectURL(file),
    };

    setFormData({
      ...formData,
      task: {
        ...formData.task,
        image: mediaFile,
      },
    });
  };

  const removeFile = (type: 'image') => {
    setFormData({
      ...formData,
      task: {
        ...formData.task,
        [type]: null,
      },
    });
  };

  return (
    <div className="grid gap-6">
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>
          Add the details and content for your task
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            placeholder="Enter task title"
            value={formData.title || ''}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Description Section (Required) */}
        <div className="space-y-2">
          <Label htmlFor="description">Task Description</Label>
          <Textarea
            id="description"
            placeholder="Enter task description"
            value={formData.description || ''}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="min-h-[100px]"
            required
          />
        </div>

        {/* Image Upload Section (Optional) */}
        <div className="space-y-2">
          <Label>Task Image (Optional)</Label>
          {formData.task.image ? (
            <div className="relative group">
              <img
                src={formData.task.image.url}
                alt="Task image"
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile('image')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'image')}
              className="cursor-pointer"
            />
          )}
        </div>

        {/* Video Link Section (Optional) */}
        <div className="space-y-2">
          <Label>Task Video (Optional)</Label>
          <Input
            type="url"
            placeholder="Enter video URL (YouTube, Vimeo, etc.)"
            value={formData.task.videoUrl || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                task: { ...formData.task, videoUrl: e.target.value },
              })
            }
          />
          <div className="text-sm text-gray-500">
            Please enter a valid video URL from YouTube, Vimeo, or similar
            platforms.
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default TaskContent;
