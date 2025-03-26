import { AuthResponse, LoginRequest, RegisterRequest } from '@/modules/Auth/types/auth.types';
import { apiClient } from '@/shared/utils/api';

export class AuthService {
  private static readonly BASE_PATH = '/auth';

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(`${this.BASE_PATH}/login`, credentials);
    return data;
  }

  static async register(credentials: RegisterRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(`${this.BASE_PATH}/register`, credentials);
    return data;
  }

  static async logout(): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/logout`);
  }

  static async refreshToken(): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(`${this.BASE_PATH}/refresh`);
    return data;
  }
}
