import { Course } from '@/modules/Admin/CourseManagement/types/course.types';
import { SortDirection } from '@/shared/types';
export interface Subject {
  id: number;
  title: string;
  code: string;
  description: string;
  credits: number;
  course?: Course;
  created_at: string;
  updated_at: string;
}

export interface SubjectResponse {
  data: Subject;
  message: string;
  timestamp: string;
}

export interface SubjectActionResponse {
  message?: string;
  timestamp: string;
}

export interface SubjectListResponse {
  data: Subject[];
  timestamp: string;
}

export interface SubjectFilterParams {
  title?: string;
  code?: string;
  sort_by?: SubjectSortBy;
  sort_direction?: SortDirection;
}

export enum SubjectSortBy {
  TITLE = 'title',
  CODE = 'code',
  CREDITS = 'credits',
  COURSE_ID = 'course_id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}
