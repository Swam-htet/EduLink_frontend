export type StudentStatus = 'pending' | 'active' | 'inactive' | 'suspended' | 'rejected';

export interface Student {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  date_of_birth: string;
  address: string;
  enrollment_date: string | null;
  status: StudentStatus;
  guardian_info: {
    name: string;
    phone: string;
    relationship: string;
  };
  nrc: string;
  profile_photo: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentResponse {
  message: string;
  data: Student;
  timestamp: string;
}

export interface DateRangeFilter {
  start: string;
  end: string;
}

export interface StudentFilterParams {
  // Basic Filters
  student_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  nrc?: string;

  // Status and Gender Filters
  status?: StudentStatus;
  gender?: 'male' | 'female' | 'other';

  // Date Range Filters
  date_of_birth?: DateRangeFilter;
  enrollment_date?: DateRangeFilter;

  // Guardian Filters
  guardian_name?: string;
  guardian_phone?: string;

  // Pagination and Sorting
  per_page?: number;
  sort_by?:
    | 'student_id'
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'enrollment_date'
    | 'status'
    | 'created_at'
    | 'updated_at';
  sort_direction?: 'asc' | 'desc';
  current_page?: number;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface StudentListResponse {
  data: Student[];
  meta: PaginationMeta;
  timestamp: string;
}

export interface ApproveRegistrationRequest {
  id: number;
}

export interface RejectRegistrationRequest {
  id: number;
  reason: string;
}
