import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { FC } from "react";
import { RoundTypeProps } from "../round-create-page";

const PointsContent: FC<RoundTypeProps> = ({ formData, setFormData }) => {
  return (
    <div className="grid gap-6">
      <CardHeader>
        <CardTitle>Set Points</CardTitle>
        <CardDescription>
          Define how many points this round is worth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Star className="h-5 w-5 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Points"
            value={formData.points}
            onChange={(e) =>
              setFormData({ ...formData, points: e.target.value })
            }
            className="w-full"
          />
        </div>
      </CardContent>
    </div>
  );
};

export default PointsContent;