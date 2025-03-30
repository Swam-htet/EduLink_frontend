import { z } from 'zod';

export const staffCreateSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  nrc: z.string().min(1, 'NRC is required'),
  role: z.string().min(1, 'Role is required'),
  gender: z.string().min(1, 'Gender is required'),
  date_of_birth: z.date({
    required_error: 'Date of birth is required'
  }),
  address: z.string().min(1, 'Address is required')
});

export type StaffCreateFormData = z.infer<typeof staffCreateSchema>;
