import { apiClient } from '@/lib/axios/api';
import type {
  LandingData,
  LandingKey,
  LandingResponse,
  LandingValue,
  SetLandingDataRequest
} from '@/modules/Tenant/Landing/types/landing.types';

export class LandingService {
  static async getLandingData(): Promise<LandingData> {
    const { data } = await apiClient.get<LandingResponse>('configs');
    return data.data;
  }

  static async getLandingDataByKey(key: LandingKey): Promise<LandingValue> {
    const { data } = await apiClient.get<LandingResponse>(`management/configs/${key}`);
    return data.data[key];
  }

  static async setLandingData({ key, value }: SetLandingDataRequest): Promise<void> {
    await apiClient.post(`management/configs/${key}`, { value });
  }
}

export default LandingService;
