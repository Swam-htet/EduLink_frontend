export enum ExamStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ExamSortBy {
  TITLE = 'title',
  EXAM_DATE = 'exam_date',
  START_TIME = 'start_time',
  END_TIME = 'end_time',
  CREATED_AT = 'created_at'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  FILL_IN_BLANK = 'fill_in_blank',
  SHORT_ANSWER = 'short_answer',
  LONG_ANSWER = 'long_answer',
  MATCHING = 'matching',
  ORDERING = 'ordering',
  ESSAY = 'essay'
}

export interface ExamSection {
  id: number;
  section_number: number;
  section_title: string;
  section_description?: string;
  total_questions: number;
  total_marks: number;
  question_type: QuestionType;
  questions?: ExamQuestion[];
}

export interface Exam {
  id: number;
  class?: {
    id: number;
    name: string;
    code: string;
  };
  subject?: {
    id: number;
    title: string;
    code: string;
  };
  title: string;
  description?: string;
  exam_details: {
    total_marks: number;
    pass_marks: number;
    duration: number;
  };
  schedule: {
    exam_date: string;
    start_time: string;
    end_time: string;
  };
  sections?: ExamSection[];
  status: ExamStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamListResponse {
  data: Exam[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
  timestamp: string;
  message?: string;
}

export interface ExamResponse {
  data: Exam;
  message?: string;
  timestamp: string;
}

// question
export interface ExamQuestion {
  id: number;
  question: string;
  type: QuestionType;
  marks: number;
  explanation?: string;
  answer_guidelines?: string;
  requires_manual_grading: boolean;
  difficulty_level: number;
  time_limit?: number;
  options?: QuestionOption[];
  correct_answer?: string;
  blank_answers?: BlankAnswer[];
  matching_pairs?: MatchingPairs;
  correct_order?: string[];
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface BlankAnswer {
  id: number;
  acceptable_answers: string[];
  case_sensitive: boolean;
}

export interface MatchingPairs {
  questions: QuestionOption[];
  answers: QuestionOption[];
  correct_pairs: { [key: string]: string };
}
