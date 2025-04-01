import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import type {
  CreateExamData,
  ExamFilterParams,
  ExamListResponse,
  ExamResponse,
  UpdateExamData,
  UploadExamQuestionsData
} from '../types/exam.types';

export class ExamManagementService {
  static async getExams(params?: ExamFilterParams) {
    const { data } = await apiClient.get<ExamListResponse>('management/exams', {
      params: params ? cleanObject(params as Record<string, unknown>) : undefined
    });
    return data;
  }

  static async getExamById(id: string) {
    const { data } = await apiClient.get<ExamResponse>(`management/exams/${id}`);
    return data;
  }

  static async createExam(examData: CreateExamData) {
    const { data } = await apiClient.post<ExamResponse>('management/exams', examData);
    return data;
  }

  static async updateExam(id: string, examData: UpdateExamData) {
    const { data } = await apiClient.put<ExamResponse>(`management/exams/${id}`, examData);
    return data;
  }

  static async uploadExamQuestions(id: string, questionData: UploadExamQuestionsData) {
    const { data } = await apiClient.post<ExamResponse>(
      `management/exams/${id}/upload-questions`,
      questionData
    );
    return data;
  }
}

export default ExamManagementService;
