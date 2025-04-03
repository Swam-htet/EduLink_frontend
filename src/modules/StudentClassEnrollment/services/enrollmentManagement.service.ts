import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import {
  type EnrollmentFilterFormData,
  type ManualEnrollmentEmailFormData,
  type UpdateEnrollmentFormData
} from '@/modules/StudentClassEnrollment/schemas/enrollment.schema';
import type { EnrollmentListResponse } from '@/modules/StudentClassEnrollment/types/enrollment.types';

export class EnrollmentManagementService {
  static async getEnrollments(params?: EnrollmentFilterFormData) {
    const { data } = await apiClient.get<EnrollmentListResponse>('management/class-enrollments', {
      params: params ? cleanObject(params as Record<string, unknown>) : undefined
    });
    return data;
  }

  static async updateEnrollment(id: number, updateData: UpdateEnrollmentFormData) {
    const { data } = await apiClient.put(`management/class-enrollments/${id}`, updateData);
    return data;
  }

  static async sendManualEnrollmentEmail(emailData: ManualEnrollmentEmailFormData) {
    const { data } = await apiClient.post('management/class-enrollments/send-email', emailData);
    return data;
  }
}

export default EnrollmentManagementService;
