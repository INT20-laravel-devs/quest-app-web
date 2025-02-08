import { z } from 'zod';

//TODO: change min
export const updateSchema = z.object({
  nickname: z.string().min(1, 'Nickname must be at least 1 characters'),
  password: z.string().min(1, 'Password must be at least 1 characters'),
});

export type UpdateFormInputs = z.infer<typeof updateSchema>;
