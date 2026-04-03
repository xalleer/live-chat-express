import { z } from '../lib/zod';

export const RegisterReqSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const LoginReqSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
});
