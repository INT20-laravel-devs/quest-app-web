import { z } from 'zod';

export const createQuestSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  timeLimit: z.number().optional(),
});

export type CreateQuestBody = z.infer<typeof createQuestSchema>;

export interface Quest extends CreateQuestBody {
  id: string;
  ownerId: string;
}

export enum TaskType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  OPEN = 'OPEN',
  IMAGE = 'IMAGE',
  MAP = "MAP"
}

export interface Coordinate {
  x: number;
  y: number;
  endX: number | null;
  endY: number | null;
  imageLink: string | null;
}

export interface Variant {
  content: string;
  isCorrect: boolean;
}

export interface CreateTaskBody {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  points: number;
  coordinate?: Coordinate;
  variants?: Variant[];
}

export interface TaskBody extends CreateTaskBody {
  imageLink?: string;
}
