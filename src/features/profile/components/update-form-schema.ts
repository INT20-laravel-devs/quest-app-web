import { z } from 'zod';

//TODO: change min
export const updateSchema = z.object({
  profileImage: z.instanceof(File).optional(),
  nickname: z.string().min(1, 'Nickname must be at least 1 characters'),
});

export type UpdateFormInputs = z.infer<typeof updateSchema>;
