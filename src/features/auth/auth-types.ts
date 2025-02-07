import { z } from 'zod';

export const loginSchema = z.object({
  nickname: z.string().min(1, 'Nickname / Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  nickname: z.string().min(1, 'Nickname is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;
