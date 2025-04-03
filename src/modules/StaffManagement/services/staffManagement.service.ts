import { apiClient } from '@/lib/axios/api';
import {
  StaffCreateFormData,
  StaffFilterFormValues
} from '@/modules/StaffManagement/schemas/staff.schema';
import {
  StaffManagementCreateResponse,
  StaffManagementDetailResponse,
  StaffManagementListResponse
} from '@/modules/StaffManagement/types/staffManagement.types';

export class StaffManagementService {
  static async getStaffList(
    filterParams: StaffFilterFormValues
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
