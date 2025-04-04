import { SubjectSortBy } from '@/modules/Admin/SubjectManagement/types/subject.types';
import { SortDirection } from '@/shared/types';
import { z } from 'zod';

export const subjectCreateSchema = z
  .object({
    course_id: z.string({
      required_error: 'Course is required'
    }),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    credits: z.string().min(1, 'Credits is required')
  })
  .refine(
    (data) => {
      const credits = parseInt(data.credits, 10);
      return !isNaN(credits) && credits > 0;
    },
    {
      message: 'Credits must be a positive number',
      path: ['credits']
    }
  );

export type SubjectCreateFormData = z.infer<typeof subjectCreateSchema>;

export const subjectFilterSchema = z.object({
  course_id: z.string().optional(),
  title: z.string().optional(),
  code: z.string().optional(),
  sort_by: z.nativeEnum(SubjectSortBy).optional(),
  sort_direction: z.nativeEnum(SortDirection).optional()
});

export type SubjectFilterParams = z.infer<typeof subjectFilterSchema>;

export const subjectUpdateSchema = z
  .object({
    id: z.number(),
    title: z
      .string()
      .min(1, 'Title is required')
      .max(255, 'Title must be less than 255 characters'),
    description: z.string().min(1, 'Description is required'),
    credits: z.string().min(1, 'Credits is required'),
    course_id: z.string().min(1, 'Course is required')
  })
  .refine(
    (data) => {
      const credits = parseInt(data.credits, 10);
      return !isNaN(credits) && credits > 0;
    },
    {
      message: 'Credits must be a positive number',
      path: ['credits']
    }
  );

export type SubjectUpdateFormData = z.infer<typeof subjectUpdateSchema>;
