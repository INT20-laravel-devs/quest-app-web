import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ImageIcon, Video } from "lucide-react";
import { FC } from "react";
import { RoundTypeProps } from "../round-create-page";

const TaskContent: FC<RoundTypeProps> = ({ formData, setFormData }) => {
  return(
    <div className="grid gap-6">
    <CardHeader>
      <CardTitle>Add Task Content</CardTitle>
      <CardDescription>
        Enter the task description and add media if needed
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <Textarea
        placeholder="Enter task description"
        value={formData.task.text}
        onChange={(e) =>
          setFormData({
            ...formData,
            task: { ...formData.task, text: e.target.value },
          })
        }
        className="min-h-[150px]"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant={formData.task.mediaType === 'text' ? 'default' : 'outline'}
          className="h-auto p-4"
          onClick={() =>
            setFormData({
              ...formData,
              task: { ...formData.task, mediaType: 'text' },
            })
          }
        >
          <FileText className="h-4 w-4 mr-2" />
          Add Text
        </Button>
        <Button
          variant={formData.task.mediaType === 'image' ? 'default' : 'outline'}
          className="h-auto p-4"
          onClick={() =>
            setFormData({
              ...formData,
              task: { ...formData.task, mediaType: 'image' },
            })
          }
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Photo
        </Button>
        <Button
          variant={formData.task.mediaType === 'video' ? 'default' : 'outline'}
          className="h-auto p-4"
          onClick={() =>
            setFormData({
              ...formData,
              task: { ...formData.task, mediaType: 'video' },
            })
          }
        >
          <Video className="h-4 w-4 mr-2" />
          Add Video
        </Button>
      </div>
    </CardContent>
  </div>
  )
};

export default TaskContent;