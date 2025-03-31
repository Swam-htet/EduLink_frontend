import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import type {
  ApproveRegistrationRequest,
  RejectRegistrationRequest,
  SendClassInviteRequest,
  SendClassInviteResponse,
  StudentFilterParams,
  StudentListResponse,
  StudentResponse
} from '@/modules/StudentManagement/types/studentManagement.types';

export class StudentManagementService {
  static async getStudents(params?: StudentFilterParams) {
    const { data } = await apiClient.get<StudentListResponse>('management/students', {
      params: params ? cleanObject(params as Record<string, unknown>) : undefined
    });
    return data;
  }

  static async getStudentById(id: string) {
    const { data } = await apiClient.get<StudentResponse>(`management/students/${id}`);
    return data;
  }

  static async approveRegistration(approveData: ApproveRegistrationRequest) {
    const { data } = await apiClient.post<StudentResponse>(
      'management/students/approve-registration',
      approveData
    );
    return data;
  }

  static async rejectRegistration(rejectData: RejectRegistrationRequest) {
    const { data } = await apiClient.post<StudentResponse>(
      'management/students/reject-registration',
      rejectData
    );
    return data;
  }

  static async sendClassInvite(inviteData: SendClassInviteRequest) {
    const { data } = await apiClient.post<SendClassInviteResponse>(
      'management/class-enrollments',
      inviteData
    );
    return data;
  }
}

export default StudentManagementService;
