export enum StudentStatus {
  Pending = 'pending',
  Active = 'active',
  Inactive = 'inactive',
  Suspended = 'suspended',
  Rejected = 'rejected'
}

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

export enum StudentSortBy {
  StudentId = 'student_id',
  Name = 'name',
  Email = 'email',
  Phone = 'phone',
  Status = 'status',
  Gender = 'gender',
  DateOfBirth = 'date_of_birth',
  EnrollmentDate = 'enrollment_date',
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at'
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

export interface SendClassInviteRequest {
  student_ids: number[];
  class_id: number;
}

export interface SendClassInviteResponse {
  message: string;
  timestamp: string;
}
