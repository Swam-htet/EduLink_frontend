import { z } from 'zod';

import {
  StaffGender,
  StaffRole,
  StaffSortBy,
  StaffStatus
} from '@/modules/Admin/StaffManagement/types/staffManagement.types';

export const staffCreateSchema = z.object({
  first_name: z.string({
    required_error: 'First name is required'
  }),
  last_name: z.string({
    required_error: 'Last name is required'
  }),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email('Invalid email address'),
  phone: z.string({
    required_error: 'Phone number is required'
  }),
  nrc: z.string({
    required_error: 'NRC is required'
  }),
  gender: z.string({
    required_error: 'Gender is required'
  }),
  role: z.string({
    required_error: 'Role is required'
  }),
  date_of_birth: z.string({
    required_error: 'Date of birth is required'
  }),
  address: z.string({
    required_error: 'Address is required'
  })
});

export type StaffCreateFormData = z.infer<typeof staffCreateSchema>;

const dateRangeSchema = z.object({
  start: z.string().date().optional(),
  end: z.string().date().optional()
});

export const staffFilterSchema = z.object({
  name: z.string().max(255).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  nrc: z.string().optional(),
  status: z.nativeEnum(StaffStatus).optional(),
  role: z.nativeEnum(StaffRole).optional(),
  gender: z.nativeEnum(StaffGender).optional(),
  date_of_birth: dateRangeSchema.optional(),
  joined_date: dateRangeSchema.optional(),
  per_page: z.number().min(1).max(100).optional(),
  current_page: z.number().min(1).optional(),
  sort_by: z.nativeEnum(StaffSortBy).optional(),
  sort_direction: z.enum(['asc', 'desc']).optional()
});

export type StaffFilterFormValues = z.infer<typeof staffFilterSchema>;
