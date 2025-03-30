import { z } from 'zod';

export const subjectCreateSchema = z.object({
  course_id: z.string({
    required_error: 'Course is required'
  }),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  credits: z.string().min(1, 'Credits is required')
});

export const subjectUpdateSchema = subjectCreateSchema.partial();

export type SubjectCreateFormData = z.infer<typeof subjectCreateSchema>;
export type SubjectUpdateFormData = z.infer<typeof subjectUpdateSchema>;
