import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import {
  SubjectCreateFormData,
  SubjectUpdateFormData
} from '@/modules/SubjectManagement/schemas/subject.schema';
import type {
  SubjectFilterParams,
  SubjectListResponse,
  SubjectResponse
} from '@/modules/SubjectManagement/types/subject.types';

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
    const { data } = await apiClient.post<SubjectResponse>('management/subjects', subjectData);
    return data;
  }

  static async updateSubject(id: string, subjectData: SubjectUpdateFormData) {
    const { data } = await apiClient.put<SubjectResponse>(`management/subjects/${id}`, subjectData);
    return data;
  }
}

export default SubjectManagementService;
