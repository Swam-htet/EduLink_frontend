export enum EnrollmentStatus {
  ENROLLED = 'enrolled',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface Enrollment {
  id: number;
  student_id: number;
  class_id: number;
  status: EnrollmentStatus;
  remarks?: string;
  enrolled_at: string;
  student: {
    id: number;
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  class: {
    id: number;
    name: string;
    code: string;
  };
  created_at: string;
  updated_at: string;
}

export enum EnrollmentSortBy {
  STUDENT_ID = 'student_id',
  CLASS_ID = 'class_id',
  ENROLLED_AT = 'enrolled_at',
  STATUS = 'status',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}

export interface EnrollmentListResponse {
  data: Enrollment[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
  timestamp: string;
  message?: string;
}

export interface UpdateEnrollmentRequest {
  id: number;
  status: EnrollmentStatus;
  remarks?: string;
}

export interface ManualEnrollmentEmailRequest {
  enrollment_ids: number[];
}

export interface EnrollmentResponse {
  data: Enrollment;
  message: string;
  timestamp: string;
}
