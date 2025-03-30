import { apiClient } from '@/lib/axios/api';
import {
  StaffManagementCreateResponse,
  StaffManagementDetailResponse,
  StaffManagementFilterParams,
  StaffManagementListResponse
} from '@/modules/StaffManagement/types/staffManagement.types';
import { StaffCreateFormData } from '../schemas/staff.schema';

export class StaffManagementService {
  static async getStaffList(
    filterParams: StaffManagementFilterParams
  ): Promise<StaffManagementListResponse> {
    const { data } = await apiClient.get<StaffManagementListResponse>(`/management/staff`, {
      params: filterParams
    });
    return data;
  }

  static async createStaff(formData: StaffCreateFormData) {
    const { data } = await apiClient.post<StaffManagementCreateResponse>(
      `/management/staff`,
      formData
    );
    return data;
  }

  static async getStaffDetail(staffId: string) {
    const { data } = await apiClient.get<StaffManagementDetailResponse>(
      `/management/staff/${staffId}`
    );
    return data;
  }
}

export default StaffManagementService;
