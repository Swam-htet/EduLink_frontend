import { ApiResponse } from '@/types';

export interface AdminUser {
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

export interface AdminAuthResponseData {
  staff: AdminUser;
  token: string;
  token_type: string;
  expires_at: number;
}

export type AdminAuthResponse = ApiResponse<AdminAuthResponseData>;

export interface AdminLoginRequest {
  email: string;
  password: string;
}
