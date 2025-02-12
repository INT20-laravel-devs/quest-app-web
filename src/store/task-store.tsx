'use client'; // If you're using Next.js App Router

import { create } from 'zustand/react';

/** Define store-related types */

// The type used in the store for each task:
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

/**
 * The store also tracks a `results` object mapping
 * task IDs -> user answer (any type).
 */
interface TaskState {
  tasks: Task[];
  results: Record<string, any>; // store answers keyed by task ID

  // Actions
  setTasks: (tasks: Task[]) => void;
  setResult: (taskId: string, answer: any) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  // Initial state
  tasks: [],
  results: {},

  // Set the array of tasks
  setTasks: (tasks) => set(() => ({ tasks })),

  // Save the user's answer for a particular task
  setResult: (taskId, answer) =>
    set((state) => ({
      results: {
        ...state.results,
        [taskId]: answer,
      },
    })),
}));
