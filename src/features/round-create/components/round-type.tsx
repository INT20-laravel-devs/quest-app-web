import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, ListChecks } from "lucide-react";
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
            variant={formData.roundType === 'open' ? 'default' : 'outline'}
            className="h-auto p-6 flex flex-col items-center gap-4"
            onClick={() => setFormData({ ...formData, roundType: 'open' })}
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
            variant={formData.roundType === 'test' ? 'default' : 'outline'}
            className="h-auto p-6 flex flex-col items-center gap-4"
            onClick={() => setFormData({ ...formData, roundType: 'test' })}
          >
            <ListChecks className="h-8 w-8" />
            <div className="text-center">
              <h3 className="font-semibold">Test Questions</h3>
              <p className="text-sm text-muted-foreground">
                Multiple choice questions
              </p>
            </div>
          </Button>
        </div>
      </CardContent>
    </div>
  );
}; 

export default RoundType;