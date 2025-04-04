import { z } from 'zod';

const scheduleSchema = z
  .object({
    date: z.string().min(1, 'Date is required'),
    start_time: z.string().min(1, 'Start time is required'),
    end_time: z.string().min(1, 'End time is required'),
    late_mins: z.string().min(1, 'Late minutes is required')
  })
  .refine(
    (data) => {
      const lateMins = parseInt(data.late_mins);
      return lateMins >= 0;
    },
    {
      message: 'Late minutes must be 0 or greater'
    }
  );

export const createClassScheduleSchema = z.object({
  class_id: z.string().min(1, 'Class is required'),
  subject_id: z.string().min(1, 'Subject is required'),
  staff_id: z.string().min(1, 'Staff is required'),
  schedules: z.array(scheduleSchema).min(1, 'At least one schedule is required')
});

export type CreateClassScheduleFormData = z.infer<typeof createClassScheduleSchema>;
