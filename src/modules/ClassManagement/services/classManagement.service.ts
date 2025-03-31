import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import type {
  ClassFilterParams,
  ClassListResponse,
  ClassResponse,
  UpdateClassData
} from '@/modules/ClassManagement/types/class.types';

interface CreateClassData {
  course_id: number;
  teacher_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  capacity: number;
}

export class ClassManagementService {
  static async getClasses(params?: ClassFilterParams) {
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

  static async createClass(classData: CreateClassData) {
    const { data } = await apiClient.post<ClassResponse>('management/classes', classData);
    return data;
  }

  static async updateClass(id: string, classData: UpdateClassData) {
    const { data } = await apiClient.put<ClassResponse>(`management/classes/${id}`, classData);
    return data;
  }
}

export default ClassManagementService;
