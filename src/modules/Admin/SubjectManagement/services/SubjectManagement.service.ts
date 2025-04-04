import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import {
  SubjectCreateFormData,
  SubjectFilterParams
} from '@/modules/Admin/SubjectManagement/schemas/subject.schema';
import type {
  SubjectActionResponse,
  SubjectListResponse,
  SubjectResponse
} from '@/modules/Admin/SubjectManagement/types/subject.types';

export class SubjectManagementService {
  static async getSubjects(params?: SubjectFilterParams) {
    const { data } = await apiClient.get<SubjectListResponse>('management/subjects', {
      params: params ? cleanObject(params as Record<string, unknown>) : undefined
    });
    return data;
  }

  static async getSubjectById(id: string) {
    const { data } = await apiClient.get<SubjectResponse>(`management/subjects/${id}`);
    return data;
  }

  static async createSubject(subjectData: SubjectCreateFormData) {
    const { data } = await apiClient.post<SubjectActionResponse>(
      'management/subjects',
      subjectData
    );
    return data;
  }

  static async updateSubject(id: string, subjectData: SubjectCreateFormData) {
    const { data } = await apiClient.put<SubjectActionResponse>(
      `management/subjects/${id}`,
      subjectData
    );
    return data;
  }

  static async deleteSubject(id: string) {
    const { data } = await apiClient.delete<SubjectActionResponse>(`management/subjects/${id}`);
    return data;
  }
}

export default SubjectManagementService;
