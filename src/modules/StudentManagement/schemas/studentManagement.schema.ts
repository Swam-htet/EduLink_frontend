import { z } from 'zod';

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

export type ApproveRegistrationFormData = z.infer<typeof approveRegistrationSchema>;
export type RejectRegistrationFormData = z.infer<typeof rejectRegistrationSchema>;
