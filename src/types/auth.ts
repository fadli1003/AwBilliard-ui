import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;

export const LoginSchema = z.object({
  email: z.email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export type LoginInput = z.infer<typeof LoginSchema>;