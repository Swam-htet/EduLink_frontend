import { ExamSortBy, ExamStatus, QuestionType } from '@/modules/ExamManagement/types/exam.types';
import { z } from 'zod';

import { SortDirection } from '@/shared/types';

// Filter schema
export const examFilterSchema = z.object({
  class_id: z.string().optional(),
  subject_id: z.string().optional(),
  title: z.string().optional(),
  status: z.nativeEnum(ExamStatus).optional(),
  exam_date: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  per_page: z.number().min(1).max(100).optional(),
  sort_by: z.nativeEnum(ExamSortBy).optional(),
  sort_direction: z.nativeEnum(SortDirection).optional(),
  current_page: z.number().optional()
});

export type ExamFilterFormData = z.infer<typeof examFilterSchema>;

// Create exam section schema
export const createExamSectionSchema = z.object({
  section_number: z.string({ required_error: 'Section number is required' }),
  section_title: z.string({ required_error: 'Section title is required' }),
  section_description: z.string().optional(),
  question_type: z.nativeEnum(QuestionType, {
    required_error: 'Question type is required'
  })
});

// Create exam schema
export const createExamSchema = z.object({
  class_id: z.string({ required_error: 'Class is required' }),
  subject_id: z.string({ required_error: 'Subject is required' }),
  title: z.string({ required_error: 'Title is required' }),
  description: z.string().optional(),
  total_marks: z.string({ required_error: 'Total marks is required' }),
  pass_marks: z.string({ required_error: 'Pass marks is required' }),
  duration: z.string({ required_error: 'Duration is required' }),
  exam_date: z.string({ required_error: 'Exam date is required' }),
  start_time: z.string({ required_error: 'Start time is required' }),
  sections: z.array(createExamSectionSchema).min(1, 'At least one section is required')
});

// Update exam schema
export const updateExamSchema = z.object({
  status: z.nativeEnum(ExamStatus).optional()
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

// Exam data type
export type CreateExamFormData = z.infer<typeof createExamSchema>;
export type UpdateExamFormData = z.infer<typeof updateExamSchema>;

// Exam question data type
export type UploadQuestionsFormData = z.infer<typeof uploadQuestionsSchema>;
export type BaseQuestion = z.infer<typeof baseQuestionSchema>;
export type QuestionOption = z.infer<typeof questionOptionSchema>;
export type BlankAnswer = z.infer<typeof blankAnswerSchema>;
export type MatchingPairs = z.infer<typeof matchingPairsSchema>;
