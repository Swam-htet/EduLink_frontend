import { Course } from '@/modules/CourseManagement/types/course.types';

export interface Subject {
  id: number;
  title: string;
  code: string;
  description: string;
  credits: number;
  status: 'active' | 'inactive';
  course?: Course;
  created_at: string;
  updated_at: string;
}

export interface SubjectResponse {
  data: Subject;
  message?: string;
}

export interface SubjectListResponse {
  data: Subject[];
}

export interface SubjectFilterParams {
  course_id?: number;
  title?: string;
  code?: string;
  status?: 'active' | 'inactive';
  credits?: number;
  sort_by?: 'title' | 'code' | 'credits' | 'course_id' | 'created_at' | 'updated_at';
  sort_direction?: 'asc' | 'desc';
}
