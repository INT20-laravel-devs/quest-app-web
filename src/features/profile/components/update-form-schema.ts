import { z } from 'zod';

//TODO: change min
export const updateSchema = z.object({
  nickname: z.string().min(1),
  avatar: z.any().nullable(), // or z.instanceof(FileList).optional()
});

export type UpdateFormInputs = z.infer<typeof updateSchema>;