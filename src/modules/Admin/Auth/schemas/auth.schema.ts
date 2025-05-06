import { z } from 'zod';

// strong password validation schema
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .regex(
    strongPasswordRegex,
    'Password need at least 8 characters, one uppercase, one lowercase, one number and one special character'
  );

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: passwordSchema
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: passwordSchema
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
