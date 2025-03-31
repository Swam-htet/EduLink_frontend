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

export interface EnrollmentFilterParams {
  student_id?: number;
  class_id?: number;
  status?: EnrollmentStatus;
  enrolled_at?: {
    start: string;
    end: string;
  };
  per_page?: number;
  sort_by?: 'student_id' | 'class_id' | 'enrolled_at' | 'status' | 'created_at' | 'updated_at';
  sort_direction?: 'asc' | 'desc';
  current_page?: number;
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
