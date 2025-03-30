import { z } from 'zod';

export const courseCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  status: z.enum(['active', 'inactive'])
});

export type CourseCreateFormData = z.infer<typeof courseCreateSchema>;
