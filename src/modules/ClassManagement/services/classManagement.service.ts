import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import {
  ClassCreateFormData,
  ClassFilterFormValues,
  ClassUpdateFormData
} from '@/modules/ClassManagement/schemas/class.schema';
import type { ClassListResponse, ClassResponse } from '@/modules/ClassManagement/types/class.types';

export class ClassManagementService {
  static async getClasses(params?: ClassFilterFormValues) {
    const { data } = await apiClient.get<ClassListResponse>('management/classes', {
      params: params ? cleanObject(params as Record<string, unknown>) : undefined
    });
    return data;
  }

  static async getAllOngoingClasses() {
    const { data } = await apiClient.get<ClassListResponse>('management/classes/ongoing');
    return data;
  }

  static async getClassById(id: string) {
    const { data } = await apiClient.get<ClassResponse>(`management/classes/${id}`);
    return data;
  }

  static async createClass(classData: ClassCreateFormData) {
    const { data } = await apiClient.post<ClassResponse>('management/classes', classData);
    return data;
  }

  static async updateClass(id: string, classData: ClassUpdateFormData) {
    const { data } = await apiClient.put<ClassResponse>(`management/classes/${id}`, classData);
    return data;
  }
}

export default ClassManagementService;
