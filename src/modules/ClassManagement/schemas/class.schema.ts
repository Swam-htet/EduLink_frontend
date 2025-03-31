import { z } from 'zod';

export const classCreateSchema = z.object({
  course_id: z.number({
    required_error: 'Please select a course'
  }),
  teacher_id: z.number({
    required_error: 'Please select a teacher'
  }),
  name: z.string().min(1, 'Class name is required'),
  description: z.string().min(1, 'Description is required'),
  date_range: z.object(
    {
      from: z.date(),
      to: z.date()
    },
    {
      required_error: 'Please select class duration'
    }
  ),
  capacity: z.number().min(1, 'Capacity must be at least 1')
});

export type ClassCreateFormData = z.infer<typeof classCreateSchema>;
