import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { FC } from "react";
import { RoundTypeProps } from "../round-create-page";



const TimeLimit: FC<RoundTypeProps> = ({ formData, setFormData }) => {
  return (
    <div className="grid gap-6">
      <CardHeader>
        <CardTitle>Set Time Limit</CardTitle>
        <CardDescription>
          Define how long participants have to complete this round
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Time in minutes"
            value={formData.timeLimit}
            onChange={(e) =>
              setFormData({ ...formData, timeLimit: e.target.value })
            }
            className="w-full"
          />
        </div>
      </CardContent>
    </div>
  );
}; 

export default TimeLimit;