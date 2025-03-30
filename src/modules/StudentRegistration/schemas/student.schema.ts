import { z } from 'zod';

// Strong password validation regex
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const studentRegistrationSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required').max(255, 'First name is too long'),
    last_name: z.string().min(1, 'Last name is required').max(255, 'Last name is too long'),
    email: z.string().email('Invalid email address').max(255, 'Email is too long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        strongPasswordRegex,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirm_password: z.string().min(1, 'Please confirm your password'),
    phone: z.string().min(1, 'Phone number is required').max(20, 'Phone number is too long'),
    address: z.string().min(1, 'Address is required').max(500, 'Address is too long'),
    date_of_birth: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Please select a gender'
    }),
    profile_photo: z.any().optional(),
    nrc: z.string().max(255, 'NRC is too long').optional(),
    guardian_name: z
      .string()
      .min(1, 'Guardian name is required')
      .max(255, 'Guardian name is too long'),
    guardian_phone: z
      .string()
      .min(1, 'Guardian phone is required')
      .max(20, 'Guardian phone is too long'),
    guardian_relationship: z
      .string()
      .min(1, 'Guardian relationship is required')
      .max(255, 'Relationship is too long')
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password']
  });

export type StudentRegistrationFormData = z.infer<typeof studentRegistrationSchema>;
