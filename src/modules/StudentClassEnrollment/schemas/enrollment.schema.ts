import { z } from 'zod';
import { EnrollmentStatus } from '../types/enrollment.types';

export const enrollmentFilterSchema = z.object({
  student_id: z.number().optional(),
  class_id: z.number().optional(),
  status: z.nativeEnum(EnrollmentStatus).optional(),
  enrolled_at: z
    .object({
      start: z.string(),
      end: z.string()
    })
    .optional(),
  per_page: z.number().min(1).max(100).optional(),
  sort_by: z
    .enum(['student_id', 'class_id', 'enrolled_at', 'status', 'created_at', 'updated_at'])
    .optional(),
  sort_direction: z.enum(['asc', 'desc']).optional(),
  current_page: z.number().optional()
});

export const updateEnrollmentSchema = z.object({
  status: z.nativeEnum(EnrollmentStatus),
  remarks: z.string().max(500).optional()
});

export const manualEnrollmentEmailSchema = z.object({
  enrollment_ids: z.array(z.number()).min(1)
});

export type EnrollmentFilterFormData = z.infer<typeof enrollmentFilterSchema>;
export type UpdateEnrollmentFormData = z.infer<typeof updateEnrollmentSchema> & {
  id: number;
};
export type ManualEnrollmentEmailFormData = z.infer<typeof manualEnrollmentEmailSchema>;
