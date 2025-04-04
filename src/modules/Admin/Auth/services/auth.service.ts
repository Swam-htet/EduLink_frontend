import { apiClient } from '@/lib/axios/api';
import {
  AdminAuthResponse,
  AdminLoginRequest,
  AdminUser
} from '@/modules/Admin/Auth/types/index.types';

export class AuthService {
  static async login(credentials: AdminLoginRequest): Promise<AdminAuthResponse> {
    const { data } = await apiClient.post<AdminAuthResponse>(`/auth/staff/login`, credentials);
    return data;
  }

  static async logout(): Promise<void> {
    await apiClient.post(`/auth/staff/logout`);
  }

  static async getProfile(): Promise<AdminUser> {
    const { data } = await apiClient.get<AdminUser>(`/auth/staff/profile`);
    return data;
  }
}
