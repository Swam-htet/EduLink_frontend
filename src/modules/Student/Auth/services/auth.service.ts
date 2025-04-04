import { apiClient } from '@/lib/axios/api';
import {
  StudentAuthResponse,
  StudentLoginRequest,
  StudentUser
} from '@/modules/Student/Auth/types/index.types';

export class AuthService {
  static async login(credentials: StudentLoginRequest): Promise<StudentAuthResponse> {
    const { data } = await apiClient.post<StudentAuthResponse>(`/auth/student/login`, credentials);
    return data;
  }

  static async logout(): Promise<void> {
    await apiClient.post(`/auth/student/logout`);
  }

  static async getProfile(): Promise<StudentUser> {
    const { data } = await apiClient.get<StudentUser>(`/auth/student/profile`);
    return data;
  }
}
