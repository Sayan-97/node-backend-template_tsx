import { email, z } from 'zod';

export const registerSchema = z.object({
  username: z.string().nonempty('Username is required'),
  email: email('Invalid email').nonempty('Email is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: email('Invalid email').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});
