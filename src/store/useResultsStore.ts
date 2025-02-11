// store/useResultStore.ts

'use client';

import { create } from 'zustand';

interface StoredAnswer {
  variantId?: string; // e.g. "1660fd0e-..."
  content?: string; // e.g. "Option A" or text input
  coords?: { x: number; y: number }; // if user clicked on an image
  // add anything else you'd like
}

interface ResultState {
  // Map: taskId -> the final object describing the user's answer
  results: Record<string, StoredAnswer | StoredAnswer[]>;
  setResult: (taskId: string, answer: StoredAnswer | StoredAnswer[]) => void;
}

export const useResultStore = create<ResultState>((set) => ({
  results: {},

  setResult: (taskId, answer) =>
    set((state) => ({
      results: {
        ...state.results,
        [taskId]: answer,
      },
    })),
}));
