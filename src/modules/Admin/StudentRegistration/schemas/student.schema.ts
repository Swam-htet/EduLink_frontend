import { z } from 'zod';

// Strong password validation regex
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const studentRegistrationSchema = z
  .object({
    first_name: z.string({
      required_error: 'First name is required'
    }),
    last_name: z.string({
      required_error: 'Last name is required'
    }),
    email: z.string({
      required_error: 'Email is required'
    }),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(8, 'Password must be at least 8 characters')
      .regex(
        strongPasswordRegex,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirm_password: z.string({
      required_error: 'Please confirm your password'
    }),
    phone: z
      .string({
        required_error: 'Phone number is required'
      })
      .max(20, 'Phone number is too long'),
    address: z
      .string({
        required_error: 'Address is required'
      })
      .max(500, 'Address is too long'),
    date_of_birth: z.string({
      required_error: 'Date of birth is required'
    }),
    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Please select a gender'
    }),
    // profile_photo: z.any().optional(),
    nrc: z
      .string({
        required_error: 'NRC is required'
      })
      .max(255, 'NRC is too long'),
    guardian_name: z
      .string({
        required_error: 'Guardian name is required'
      })
      .max(255, 'Guardian name is too long'),
    guardian_phone: z
      .string({
        required_error: 'Guardian phone is required'
      })
      .max(20, 'Guardian phone is too long'),
    guardian_relationship: z
      .string({
        required_error: 'Guardian relationship is required'
      })
      .max(255, 'Relationship is too long')
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password']
  });

export type StudentRegistrationFormData = z.infer<typeof studentRegistrationSchema>;
