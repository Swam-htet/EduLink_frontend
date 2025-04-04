import { ApiResponse } from '@/types';

export interface StudentUser {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  address: string;
  enrollment_date: string;
  guardian_info: {
    name: string;
    phone: string;
    relationship: string;
  };
  nrc: string | null;
  profile_photo: string | null;
  created_at: string;
}

export interface StudentAuthResponseData {
  student: StudentUser;
  token: string;
  token_type: string;
  expires_at: number;
}

export type StudentAuthResponse = ApiResponse<StudentAuthResponseData>;

export interface StudentLoginRequest {
  email: string;
  password: string;
}
