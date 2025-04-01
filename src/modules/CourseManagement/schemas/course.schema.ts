import { CourseSortBy } from '@/modules/CourseManagement/types/course.types';
import { SortDirection } from '@/shared/types';
import { z } from 'zod';

export const courseCreateSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    duration: z.string().min(1, 'Duration is required')
  })
  .refine(
    (data) => {
      const duration = parseInt(data.duration, 10);
      return !isNaN(duration) && duration > 0;
    },
    {
      message: 'Duration must be a positive number',
      path: ['duration']
    }
  );

export type CourseCreateFormData = z.infer<typeof courseCreateSchema>;

export const courseUpdateSchema = z
  .object({
    id: z.number(),
    title: z
      .string()
      .min(1, 'Title is required')
      .max(255, 'Title must be less than 255 characters'),
    description: z.string().min(1, 'Description is required'),
    duration: z.string().min(1, 'Duration is required')
  })
  .refine(
    (data) => {
      const duration = parseInt(data.duration, 10);
      return !isNaN(duration) && duration > 0;
    },
    {
      message: 'Duration must be a positive number',
      path: ['duration']
    }
  );

export type CourseUpdateFormData = z.infer<typeof courseUpdateSchema>;

export const courseFilterSchema = z.object({
  title: z.string().optional(),
  code: z.string().optional(),
  sort_by: z.nativeEnum(CourseSortBy).optional(),
  sort_direction: z.nativeEnum(SortDirection).optional()
});

export type CourseFilterParams = z.infer<typeof courseFilterSchema>;
