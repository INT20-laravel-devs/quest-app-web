import { z } from 'zod';

export const createQuestSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  timeLimit: z.number().optional(),
});

export type CreateQuestBody = z.infer<typeof createQuestSchema>;
