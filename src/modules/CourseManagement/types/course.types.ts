export interface Course {
  id: number;
  title: string;
  code: string;
  description: string;
  duration: string;
  status: 'active' | 'inactive';
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
  status?: 'active' | 'inactive';
  sort_by?: 'name' | 'code' | 'created_at' | 'updated_at';
  sort_direction?: 'asc' | 'desc';
}
