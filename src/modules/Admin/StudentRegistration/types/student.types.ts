export enum StudentStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected'
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
  guardian_info: {
    name: string;
    phone: string;
    relationship: string;
  };
  nrc: string;
  profile_photo: string | null;
  created_at: string;
}

export interface StudentRegistrationResponse {
  message: string;
  data: Student;
}
