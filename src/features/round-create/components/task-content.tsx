import { Button } from '@/components/ui/button';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FileText, ImageIcon, Video } from 'lucide-react';
import { FC } from 'react';
import { RoundTypeProps } from '../round-create-page';

const TaskContent: FC<RoundTypeProps> = ({ formData, setFormData }) => {
  const renderMediaContent = () => {
    switch (formData.task.mediaType) {
      case 'text':
        return (
          <Textarea
            placeholder="Enter additional text content"
            value={formData.task.mediaContent || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                task: { ...formData.task, mediaContent: e.target.value },
              })
            }
            className="min-h-[150px]"
          />
        );
      case 'image':
        return (
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  task: { ...formData.task, mediaContent: e.target.files?.[0] },
                })
              }
              className="cursor-pointer"
            />
            {formData.task.mediaContent && (
              <p className="text-sm text-gray-500">
                Selected image: {formData.task.mediaContent.name}
              </p>
            )}
          </div>
        );
      case 'video':
        return (
          <Input
            type="url"
            placeholder="Enter video URL"
            value={formData.task.mediaContent || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                task: { ...formData.task, mediaContent: e.target.value },
              })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-6">
      <CardHeader>
        <CardTitle>Add Task Content</CardTitle>
        <CardDescription>
          Enter the task description and add media if needed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant={formData.task.mediaType === 'text' ? 'default' : 'outline'}
            className="h-auto p-4"
            onClick={() =>
              setFormData({
                ...formData,
                task: { ...formData.task, mediaType: 'text', mediaContent: '' },
              })
            }
          >
            <FileText className="h-4 w-4 mr-2" />
            Add Text
          </Button>
          <Button
            variant={
              formData.task.mediaType === 'image' ? 'default' : 'outline'
            }
            className="h-auto p-4"
            onClick={() =>
              setFormData({
                ...formData,
                task: {
                  ...formData.task,
                  mediaType: 'image',
                  mediaContent: null,
                },
              })
            }
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
          <Button
            variant={
              formData.task.mediaType === 'video' ? 'default' : 'outline'
            }
            className="h-auto p-4"
            onClick={() =>
              setFormData({
                ...formData,
                task: {
                  ...formData.task,
                  mediaType: 'video',
                  mediaContent: '',
                },
              })
            }
          >
            <Video className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        </div>
        {renderMediaContent()}
      </CardContent>
    </div>
  );
};

export default TaskContent;
