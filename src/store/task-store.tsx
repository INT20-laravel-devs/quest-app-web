'use client';

import { create } from 'zustand';

/** Define store-related types */

export interface Variant {
  id: string;
  taskId: string;
  content: string;
  isCorrect: boolean;
}

export type TaskType = 'MULTIPLE' | 'SINGLE' | 'OPEN' | 'IMAGE' | 'MAP';

export interface Coordinate {
  id: string;
  taskId: string;
  x: number;
  y: number;
  endX: number;
  endY: number;
  imageLink?: string | null;
}

export interface Task {
  id: string;
  questId: string;
  title: string;
  description: string;
  order: number;
  points: number;
  type: TaskType;
  variants: Variant[];
  coordinate: Coordinate | null;
}

interface TaskState {
  tasks: Task[];
  results: Record<string, unknown>;
  setTasks: (tasks: Task[]) => void;
  setResult: (taskId: string, answer: unknown) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  results: {},

  setTasks: (tasks) => set({ tasks }),

  setResult: (taskId, answer) =>
    set((state) => ({
      results: { ...state.results, [taskId]: answer },
    })),
}));
