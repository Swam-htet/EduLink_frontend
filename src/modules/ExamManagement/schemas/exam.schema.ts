import { ExamStatus, QuestionType } from '@/modules/ExamManagement/types/exam.types';
import { z } from 'zod';

// Filter schema
export const examFilterSchema = z.object({
  class_id: z.string().optional(),
  subject_id: z.string().optional(),
  title: z.string().optional(),
  status: z.nativeEnum(ExamStatus).optional(),
  date_range: z
    .object({
      start: z.string(),
      end: z.string()
    })
    .optional(),
  per_page: z.number().min(1).max(100).optional(),
  sort_by: z.enum(['title', 'start_date', 'created_at']).optional(),
  sort_direction: z.enum(['asc', 'desc']).optional(),
  current_page: z.number().optional()
});

// Create exam section schema
export const createExamSectionSchema = z.object({
  section_number: z.string(),
  section_title: z.string().min(1, 'Section title is required'),
  section_description: z.string().optional()
});

// Create exam schema
export const createExamSchema = z.object({
  class_id: z.string(),
  subject_id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  total_marks: z.string(),
  pass_marks: z.string(),
  duration: z.string(),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  sections: z.array(createExamSectionSchema).min(1, 'At least one section is required')
});

// Update exam schema
export const updateExamSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  total_marks: z.number().min(1, 'Total marks must be at least 1').optional(),
  pass_marks: z.number().min(1, 'Pass marks must be at least 1').optional(),
  duration: z.number().min(1, 'Duration must be at least 1 minute').optional(),
  start_date: z.string().min(1, 'Start date is required').optional(),
  end_date: z.string().min(1, 'End date is required').optional(),
  status: z.nativeEnum(ExamStatus).optional(),
  sections: z.array(createExamSectionSchema).min(1, 'At least one section is required').optional()
});

// Question option schema
export const questionOptionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Option text is required')
});

// Blank answer schema
export const blankAnswerSchema = z.object({
  id: z.number(),
  acceptable_answers: z.array(z.string()).min(1, 'At least one acceptable answer is required'),
  case_sensitive: z.boolean().optional().default(false)
});

// Matching pairs schema
export const matchingPairsSchema = z.object({
  questions: z.array(questionOptionSchema).min(2, 'At least two questions are required'),
  answers: z.array(questionOptionSchema).min(2, 'At least two answers are required'),
  correct_pairs: z.record(z.string(), z.string())
});

// Base question schema
export const baseQuestionSchema = z.object({
  section_id: z.number(),
  question: z.string(),
  type: z.nativeEnum(QuestionType),
  marks: z.string(),
  explanation: z.string().optional(),
  answer_guidelines: z.string().optional(),
  requires_manual_grading: z.boolean().optional(),
  difficulty_level: z.string(),
  time_limit: z.string().optional(),
  options: z.array(questionOptionSchema).optional(),
  correct_answer: z.string(),
  blank_answers: z.array(blankAnswerSchema).optional(),
  matching_pairs: matchingPairsSchema.optional(),
  correct_order: z.array(z.string()).optional()
});

// Multiple choice question schema
export const multipleChoiceQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionType.MULTIPLE_CHOICE),
  options: z.array(questionOptionSchema).min(2, 'At least two options are required'),
  correct_answer: z.string()
});

// True false question schema
export const trueFalseQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionType.TRUE_FALSE),
  options: z
    .array(questionOptionSchema)
    .length(2, 'Exactly two options (true and false) are required'),
  correct_answer: z.string()
});

// Fill in blank question schema
export const fillInBlankQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionType.FILL_IN_BLANK),
  blank_answers: z.array(blankAnswerSchema).min(1, 'At least one blank answer is required')
});

// Short answer question schema
export const shortAnswerQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionType.SHORT_ANSWER),
  answer_guidelines: z.string().optional()
});

// Long answer question schema
export const longAnswerQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionType.LONG_ANSWER),
  answer_guidelines: z.string().optional()
});

// Matching question schema
export const matchingQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionType.MATCHING),
  matching_pairs: matchingPairsSchema
});

// Ordering question schema
export const orderingQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionType.ORDERING),
  options: z.array(questionOptionSchema).min(2, 'At least two options are required'),
  correct_order: z.array(z.string()).min(2, 'At least two items in the correct order are required')
});

// Essay question schema
export const essayQuestionSchema = baseQuestionSchema.extend({
  type: z.literal(QuestionType.ESSAY),
  answer_guidelines: z.string().optional()
});

// Upload question schema
export const uploadQuestionSchema = z.discriminatedUnion('type', [
  multipleChoiceQuestionSchema,
  trueFalseQuestionSchema,
  fillInBlankQuestionSchema,
  shortAnswerQuestionSchema,
  longAnswerQuestionSchema,
  matchingQuestionSchema,
  orderingQuestionSchema,
  essayQuestionSchema
]);

// Upload questions schema
export const uploadQuestionsSchema = z.object({
  exam_questions: z.array(baseQuestionSchema).min(1, 'At least one question is required')
});

// Type exports
export type ExamFilterFormData = z.infer<typeof examFilterSchema>;
export type CreateExamFormData = z.infer<typeof createExamSchema>;
export type UpdateExamFormData = z.infer<typeof updateExamSchema>;
export type UploadQuestionsFormData = z.infer<typeof uploadQuestionsSchema>;
export type BaseQuestion = z.infer<typeof baseQuestionSchema>;
export type QuestionOption = z.infer<typeof questionOptionSchema>;
export type BlankAnswer = z.infer<typeof blankAnswerSchema>;
export type MatchingPairs = z.infer<typeof matchingPairsSchema>;
