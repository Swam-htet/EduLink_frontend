import { ApiResponse } from '@/shared/types';

export interface User {
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

export interface AuthResponseData {
  staff: User;
  token: string;
  token_type: string;
  expires_at: number;
}

export type AuthResponse = ApiResponse<AuthResponseData>;

export interface LoginRequest {
  email: string;
  password: string;
}
