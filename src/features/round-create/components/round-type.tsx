import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TaskType } from "@/types/quests";
import { Dog, EarthIcon, FileText, List, ListChecks } from "lucide-react";
import { FC } from "react";
import { RoundTypeProps } from "../round-create-page";


const RoundType: FC<RoundTypeProps> = ({ formData, setFormData }) => {
  return (
    <div className="grid gap-6">
      <CardHeader>
        <CardTitle>Select Round Type</CardTitle>
        <CardDescription>
          Choose how participants will answer this round
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={
              formData.roundType === TaskType.OPEN ? 'default' : 'outline'
            }
            className="h-auto p-6 flex flex-col items-center gap-4"
            onClick={() =>
              setFormData({ ...formData, roundType: TaskType.OPEN })
            }
          >
            <FileText className="h-8 w-8" />
            <div className="text-center">
              <h3 className="font-semibold">Open Answers</h3>
              <p className="text-sm text-muted-foreground">
                Participants provide written answers
              </p>
            </div>
          </Button>
          <Button
            variant={
              formData.roundType === TaskType.MULTIPLE ? 'default' : 'outline'
            }
            className="h-auto p-6 flex flex-col items-center gap-4"
            onClick={() =>
              setFormData({ ...formData, roundType: TaskType.MULTIPLE })
            }
          >
            <ListChecks className="h-8 w-8" />
            <div className="text-center">
              <h3 className="font-semibold">Test Questions</h3>
              <p className="text-sm text-muted-foreground">
                Multiple choice questions
              </p>
            </div>
          </Button>
          <Button
            variant={
              formData.roundType === TaskType.MAP ? 'default' : 'outline'
            }
            className="h-auto p-6 flex flex-col items-center gap-4"
            onClick={() =>
              setFormData({ ...formData, roundType: TaskType.MAP })
            }
          >
            <EarthIcon className="h-8 w-8" />
            <div className="text-center">
              <h3 className="font-semibold">Geolocation</h3>
              <p className="text-sm text-muted-foreground">
                Select object on image
              </p>
            </div>
          </Button>
          <Button
            variant={
              formData.roundType === TaskType.SINGLE ? 'default' : 'outline'
            }
            className="h-auto p-6 flex flex-col items-center gap-4"
            onClick={() =>
              setFormData({ ...formData, roundType: TaskType.SINGLE })
            }
          >
            <List className="h-8 w-8" />
            <div className="text-center">
              <h3 className="font-semibold">Single Answer</h3>
              <p className="text-sm text-muted-foreground">
                Select one right answer
              </p>
            </div>
          </Button>
          <Button
            variant={
              formData.roundType === TaskType.IMAGE ? 'default' : 'outline'
            }
            className="h-auto p-6 flex flex-col items-center gap-4"
            onClick={() =>
              setFormData({ ...formData, roundType: TaskType.IMAGE })
            }
          >
            <Dog className="h-8 w-8" />
            <div className="text-center">
              <h3 className="font-semibold">Image</h3>
              <p className="text-sm text-muted-foreground">
                Select object on the image
              </p>
            </div>
          </Button>
        </div>
      </CardContent>
    </div>
  );
}; 

export default RoundType;