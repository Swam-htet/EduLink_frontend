import { SortDirection } from '@/shared/types';

export interface Course {
  id: number;
  title: string;
  code: string;
  description: string;
  duration: string;
  created_at: string;
  updated_at: string;
}

export interface CourseResponse {
  data: Course;
  message: string;
  timestamp: string;
}

export interface CourseListResponse {
  data: Course[];
  timestamp: string;
}

export interface CourseFilterParams {
  title?: string;
  code?: string;
  sort_by?: CourseSortBy;
  sort_direction?: SortDirection;
}

export interface CourseActionResponse {
  message: string;
  timestamp: string;
}

export enum CourseSortBy {
  TITLE = 'title',
  CODE = 'code',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}
