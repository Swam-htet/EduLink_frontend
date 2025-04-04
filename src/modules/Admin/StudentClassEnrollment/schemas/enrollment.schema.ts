import {
  EnrollmentSortBy,
  EnrollmentStatus
} from '@/modules/Admin/StudentClassEnrollment/types/enrollment.types';
import { SortDirection } from '@/shared/types';
import { z } from 'zod';

export const enrollmentFilterSchema = z.object({
  student_id: z.number().optional(),
  class_id: z.number().optional(),
  status: z.nativeEnum(EnrollmentStatus).optional(),
  enrolled_at: z
    .object({
      start: z.string().optional(),
      end: z.string().optional()
    })
    .optional(),
  per_page: z.number().min(1).max(100).optional(),
  sort_by: z.nativeEnum(EnrollmentSortBy).optional(),
  sort_direction: z.nativeEnum(SortDirection).optional(),
  current_page: z.number().optional()
});

export const updateEnrollmentSchema = z.object({
  status: z.nativeEnum(EnrollmentStatus),
  remarks: z.string()
});

export const manualEnrollmentEmailSchema = z.object({
  enrollment_ids: z.array(z.number()).min(1)
});

export type EnrollmentFilterFormData = z.infer<typeof enrollmentFilterSchema>;
export type UpdateEnrollmentFormData = z.infer<typeof updateEnrollmentSchema>;
export type ManualEnrollmentEmailFormData = z.infer<typeof manualEnrollmentEmailSchema>;
