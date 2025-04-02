import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import { EnrollmentFilterFormData } from '@/modules/StudentClassEnrollment/schemas/enrollment.schema';
import type {
  EnrollmentListResponse,
  ManualEnrollmentEmailRequest,
  UpdateEnrollmentRequest
} from '@/modules/StudentClassEnrollment/types/enrollment.types';

export class EnrollmentManagementService {
  static async getEnrollments(params?: EnrollmentFilterFormData) {
    const { data } = await apiClient.get<EnrollmentListResponse>('management/class-enrollments', {
      params: params ? cleanObject(params as Record<string, unknown>) : undefined
    });
    return data;
  }

  static async updateEnrollment(id: number, updateData: UpdateEnrollmentRequest) {
    const { data } = await apiClient.put(`management/class-enrollments/${id}`, updateData);
    return data;
  }

  static async sendManualEnrollmentEmail(emailData: ManualEnrollmentEmailRequest) {
    const { data } = await apiClient.post('management/class-enrollments/send-email', emailData);
    return data;
  }
}

export default EnrollmentManagementService;
