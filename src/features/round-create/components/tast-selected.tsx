import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Trash2 } from 'lucide-react';
import { RoundPlayType } from '../round-create-page';

interface TaskSelectedProps {
  roundType: RoundPlayType;
  formData: any;
  setFormData: (data: any) => void;
}

const TaskSelected: FC<TaskSelectedProps> = ({
  roundType,
  formData,
  setFormData,
}) => {
  const renderOpenForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="taskDescription">Task Description</Label>
        <Textarea
          id="taskDescription"
          placeholder="Enter task description..."
          value={formData.description || ''}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="correctAnswer">Sample Answer (Optional)</Label>
        <Textarea
          id="correctAnswer"
          placeholder="Enter a sample correct answer..."
          value={formData.sampleAnswer || ''}
          onChange={(e) =>
            setFormData({ ...formData, sampleAnswer: e.target.value })
          }
          className="min-h-[100px]"
        />
      </div>
    </div>
  );

  const renderTestForm = () => {
    const addNewOption = () => {
      const newOptions = [
        ...(formData.options || []),
        { text: '', isCorrect: false },
      ];
      setFormData({ ...formData, options: newOptions });
    };

    const removeOption = (index: number) => {
      const newOptions = formData.options.filter(
        (_: any, i: number) => i !== index,
      );
      setFormData({ ...formData, options: newOptions });
    };

    const updateOption = (index: number, text: string, isCorrect: boolean) => {
      const newOptions = [...formData.options];
      newOptions[index] = { text, isCorrect };
      setFormData({ ...formData, options: newOptions });
    };

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {(formData.options || []).map((option: any, index: number) => (
            <div key={index} className="flex items-start gap-4 group">
              <div className="flex-grow space-y-2">
                <Input
                  placeholder={`Enter option ${index + 1}`}
                  value={option.text}
                  onChange={(e) =>
                    updateOption(index, e.target.value, option.isCorrect)
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  checked={option.isCorrect}
                  onCheckedChange={(checked) =>
                    updateOption(index, option.text, checked as boolean)
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={addNewOption} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Option
        </Button>
        <div className="text-sm text-gray-500">
          Check the boxes next to correct answers (multiple can be correct)
        </div>
      </div>
    );
  };

  const renderSingleForm = () => {
    const addNewOption = () => {
      const newOptions = [
        ...(formData.options || []),
        { text: '', isCorrect: false },
      ];
      setFormData({ ...formData, options: newOptions });
    };

    const removeOption = (index: number) => {
      const newOptions = formData.options.filter(
        (_: any, i: number) => i !== index,
      );
      setFormData({ ...formData, options: newOptions });
    };

    const setCorrectOption = (index: number) => {
      const newOptions = formData.options.map((option: any, i: number) => ({
        ...option,
        isCorrect: i === index,
      }));
      setFormData({ ...formData, options: newOptions });
    };

    const updateOptionText = (index: number, text: string) => {
      const newOptions = [...formData.options];
      newOptions[index] = { ...newOptions[index], text };
      setFormData({ ...formData, options: newOptions });
    };

    // Find the index of the correct option
    const correctOptionIndex = formData.options?.findIndex(
      (option: any) => option.isCorrect,
    );

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <RadioGroup
            value={
              correctOptionIndex !== -1
                ? correctOptionIndex.toString()
                : undefined
            }
            onValueChange={(value) => setCorrectOption(parseInt(value))}
          >
            {(formData.options || []).map((option: any, index: number) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="flex-grow space-y-2">
                  <Input
                    placeholder={`Enter option ${index + 1}`}
                    value={option.text}
                    onChange={(e) => updateOptionText(index, e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <RadioGroupItem value={index.toString()} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button variant="outline" onClick={addNewOption} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Option
        </Button>
        <div className="text-sm text-gray-500">
          Select the radio button next to the correct answer
        </div>
      </div>
    );
  };

  const renderFormByType = () => {
    switch (roundType) {
      case 'open':
        return renderOpenForm();
      case 'test':
        return renderTestForm();
      case 'single':
        return renderSingleForm();
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">{renderFormByType()}</CardContent>
    </Card>
  );
};

export default TaskSelected;
