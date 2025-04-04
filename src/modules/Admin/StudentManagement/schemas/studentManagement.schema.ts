import { StudentStatus } from '@/modules/Admin/StudentRegistration/types/student.types';
import { SortDirection } from '@/types';
import { z } from 'zod';
import { StudentSortBy } from '../types/studentManagement.types';

export const approveRegistrationSchema = z.object({
  id: z.number({
    required_error: 'Student ID is required'
  })
});

export const rejectRegistrationSchema = z.object({
  id: z.number({
    required_error: 'Student ID is required'
  }),
  reason: z
    .string()
    .min(1, 'Reason is required')
    .max(500, 'Reason must be less than 500 characters')
});

export const studentFilterSchema = z.object({
  student_id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional().or(z.string().length(0)),
  phone: z.string().optional(),
  nrc: z.string().optional(),
  status: z.nativeEnum(StudentStatus).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  guardian_name: z.string().optional(),
  guardian_phone: z.string().optional(),
  date_of_birth: z
    .object({
      start: z.string().optional(),
      end: z.string().optional()
    })
    .optional(),
  enrollment_date: z
    .object({
      start: z.string().optional(),
      end: z.string().optional()
    })
    .optional(),
  per_page: z.number().optional(),
  sort_by: z.nativeEnum(StudentSortBy).optional(),
  current_page: z.number().optional(),
  sort_direction: z.nativeEnum(SortDirection).optional()
});

export type StudentFilterParams = z.infer<typeof studentFilterSchema>;

export type ApproveRegistrationFormData = z.infer<typeof approveRegistrationSchema>;
export type RejectRegistrationFormData = z.infer<typeof rejectRegistrationSchema>;
