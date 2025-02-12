import { TaskType } from '@/types/quests';
import {
  CircleCheck,
  FileText,
  ImageIcon,
  ListChecks,
  LucideProps,
  MapPin,
} from 'lucide-react';
import { ReactNode } from 'react';

interface TaskContent {
  type: TaskType;
  title: string;
  description: string;
  icon: (props: LucideProps) => ReactNode;
}

export const taskTypes = [
  {
    type: TaskType.SINGLE,
    title: 'Single Answer',
    description: 'Select one right answer',
    icon: CircleCheck,
  },
  {
    type: TaskType.MULTIPLE,
    title: 'Multiple Choice',
    description: 'Multiple choice questions',
    icon: ListChecks,
  },
  {
    type: TaskType.OPEN,
    title: 'Open Answers',
    description: 'Participants provide written answers',
    icon: FileText,
  },
  {
    type: TaskType.IMAGE,
    title: 'Image',
    description: 'Select object on the image',
    icon: ImageIcon,
  },
  {
    type: TaskType.LOCATION,
    title: 'Geolocation',
    description: 'Select object on image',
    icon: MapPin,
  },
] as TaskContent[];
