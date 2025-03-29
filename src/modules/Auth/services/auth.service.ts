import { AuthResponse, LoginRequest, User } from '@/modules/Auth/types/auth.types';
import { apiClient } from '@/shared/utils/api';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(`/auth/staff/login`, credentials);
    return data;
  }

  static async logout(): Promise<void> {
    await apiClient.post(`/auth/staff/logout`);
  }

  static async getProfile(): Promise<User> {
    const { data } = await apiClient.get<User>(`/auth/staff/profile`);
    return data;
  }
}
