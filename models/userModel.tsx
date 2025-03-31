import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  city: z.string(),
  age: z.number().int().min(18).max(65),
  salary: z.number().int().min(20000).max(120000),
  avatar: z.string().url(),
});

export type User = z.infer<typeof UserSchema>;
