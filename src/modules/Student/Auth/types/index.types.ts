import { ApiResponse } from '@/shared/types';

// todo : need to update later
export interface StudentUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  nrc: string;
  profile_photo: string | null;
  date_of_birth: string;
  address: string;
  role: string;
  joined_date: string;
  qualifications: string | null;
  created_at: string;
}

export interface StudentAuthResponseData {
  studentUser: StudentUser;
  token: string;
  token_type: string;
  expires_at: number;
}

export type StudentAuthResponse = ApiResponse<StudentAuthResponseData>;

export interface StudentLoginRequest {
  email: string;
  password: string;
}
