import { Subject } from '@/modules/SubjectManagement/types/subject.types';

export enum ClassStatus {
  Scheduled = 'scheduled',
  Ongoing = 'ongoing',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface Class {
  id: number;
  name: string;
  code: string;
  description: string;
  start_date: string;
  end_date: string;
  capacity: number;
  status: ClassStatus;
  course?: {
    id: number;
    title: string;
  };
  subject?: Subject;
  teacher?: {
    id: number;
    first_name: string;
    last_name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ClassListResponse {
  data: Class[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface ClassResponse {
  data: Class;
  message?: string;
}

export interface ClassFilterParams {
  name?: string;
  code?: string;
  status?: ClassStatus;
  course_id?: number;
  teacher_id?: number;
  date_range?: {
    start: string;
    end: string;
  };
  capacity?: ('available' | 'full')[];
  per_page?: number;
  current_page?: number;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
}

export interface CreateClassData {
  course_id: number;
  teacher_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  capacity: number;
}

export interface UpdateClassData {
  course_id?: number;
  teacher_id?: number;
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  capacity?: number;
  status?: ClassStatus;
}
