export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamMatchingPair {
  questions: ExamOption[];
  answers: ExamOption[];
}

export interface ExamQuestion {
  id: number;
  question: string;
  type: QuestionType;
  marks: number;
  explanation: string | null;
  answer_guidelines: string | null;
  requires_manual_grading: boolean;
  difficulty_level: number;
  time_limit: number | null;
  options?: ExamOption[];
  matching_pairs?: ExamMatchingPair;
}

export interface ExamQuestionResponse {
  data: ExamData;
  message: string;
  timestamp: string;
}

export interface ExamSection {
  id: number;
  section_number: number;
  section_title: string;
  total_questions: number;
  total_marks: number;
  questions: ExamQuestion[];
}

export interface ExamDetails {
  total_marks: number;
  pass_marks: number;
  duration: number;
}

export interface ExamSchedule {
  exam_date: string;
  start_time: string;
  end_time: string;
}

export interface ExamClass {
  id: number;
  name: string;
  code: string;
}

export interface ExamSubject {
  id: number;
  title: string;
  code: string;
}

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_in_blank'
  | 'short_answer'
  | 'long_answer'
  | 'matching'
  | 'ordering'
  | 'essay';

export interface ExamAnswer {
  id: number;
  question_id: number;
  section_id: number;
  type: QuestionType | null;
  answer: Record<string, string | string[] | { question: string; answer: string }[]> | null;
  question: ExamQuestion;
}

export interface ExamSubmission {
  exam_id: number;
  answers: ExamAnswer[];
}

export interface ExamData {
  id: number;
  title: string;
  description: string | null;
  class: ExamClass;
  subject: ExamSubject;
  exam_details: ExamDetails;
  schedule: ExamSchedule;
  sections: ExamSection[];
  created_at: string;
}

export interface ExamListResponse {
  data: ExamData[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
  timestamp: string;
}

export interface ExamData {
  id: number;
  title: string;
  description: string | null;
  class: ExamClass;
  subject: ExamSubject;
  exam_details: ExamDetails;
  schedule: ExamSchedule;
  created_at: string;
}

export interface ExamResultResponse {
  data: ExamResultData;
  message: string;
  timestamp: string;
}

export interface ExamResultData {
  id: number;
  total_marks_obtained: number;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  status: string;
  submitted_at: string;
  is_correct: boolean;
  marks_obtained: number;
  answers: ExamAnswer[];
}
