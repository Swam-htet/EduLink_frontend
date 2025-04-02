import { ClassStatus } from '@/modules/ClassManagement/types/class.types';
import { z } from 'zod';

export const classCreateSchema = z
  .object({
    course_id: z.string({
      required_error: 'Please select a course'
    }),
    teacher_id: z.string({
      required_error: 'Please select a teacher'
    }),
    name: z.string({
      required_error: 'Class name is required'
    }),
    description: z.string({
      required_error: 'Description is required'
    }),
    start_date: z.string({
      required_error: 'Start date is required'
    }),
    end_date: z.string({
      required_error: 'End date is required'
    }),
    capacity: z.string()
  })
  .refine(
    (data) => {
      const capacity = parseInt(data.capacity, 10);
      return !isNaN(capacity) && capacity > 0;
    },
    {
      path: ['capacity'],
      message: 'Capacity must be a number greater than 0'
    }
  );

export type ClassCreateFormData = z.infer<typeof classCreateSchema>;

export const classFilterSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  status: z.nativeEnum(ClassStatus).optional(),
  course_id: z.string().optional(),
  date_range: z
    .object({
      start: z.string().optional(),
      end: z.string().optional()
    })
    .optional(),
  sort_by: z.string().optional(),
  sort_order: z.string().optional(),
  current_page: z.number().optional(),
  per_page: z.number().optional()
});

export type ClassFilterFormValues = z.infer<typeof classFilterSchema>;

export const classUpdateSchema = z.object({
  status: z.nativeEnum(ClassStatus).optional()
});

export type ClassUpdateFormData = z.infer<typeof classUpdateSchema>;
