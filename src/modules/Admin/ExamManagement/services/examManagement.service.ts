import { apiClient } from '@/lib/axios/api';
import { cleanObject } from '@/lib/utils';
import {
  type CreateExamFormData,
  type ExamFilterFormData,
  type UpdateExamFormData,
  type UploadQuestionsFormData
} from '@/modules/Admin/ExamManagement/schemas/exam.schema';
import type {
  ExamDetailsResponse,
  ExamListResponse,
  ExamResultListResponse,
  ExamResultResponse
} from '@/modules/Admin/ExamManagement/types/exam.types';

import type { ActionResponse } from '@/types';
export class ExamManagementService {
  static async getExams(params?: ExamFilterFormData) {
    const { data } = await apiClient.get<ExamListResponse>('management/exams', {
      params: params ? cleanObject(params as Record<string, unknown>) : undefined
    });
    return data;
  }

  static async getExamById(id: string) {
    const { data } = await apiClient.get<ExamDetailsResponse>(`management/exams/${id}`);
    return data;
  }

  static async createExam(examData: CreateExamFormData) {
    const { data } = await apiClient.post<ActionResponse>('management/exams', examData);
    return data;
  }

  static async updateExam(id: string, examData: UpdateExamFormData) {
    const { data } = await apiClient.put<ActionResponse>(`management/exams/${id}`, examData);
    return data;
  }

  static async uploadExamQuestions(id: string, questionData: UploadQuestionsFormData) {
    const { data } = await apiClient.post<ActionResponse>(
      `management/exams/${id}/upload-questions`,
      questionData
    );
    return data;
  }

  static async publishExam(id: string) {
    const { data } = await apiClient.post<ActionResponse>(`management/exams/${id}/publish`);
    return data;
  }

  static async sendManualPublish(id: string) {
    const { data } = await apiClient.post<ActionResponse>(
      `management/exams/${id}/send-publish-mail`
    );
    return data;
  }

  static async getExamResults(id: string) {
    const { data } = await apiClient.get<ExamResultListResponse>(`management/exams/${id}/results`);
    return data;
  }

  static async getExamResultDetail(examId?: string, resultId?: string, studentId?: string) {
    const { data } = await apiClient.get<ExamResultResponse>(
      `management/exams/${examId}/results/${resultId}/students/${studentId}`
    );
    return data;
  }

  static async manualGrading(
    answerId?: string,
    resultId?: string,
    marks?: number,
    comments?: string
  ) {
    const { data } = await apiClient.post<ActionResponse>(`management/exams/manual-grading`, {
      answer_id: answerId,
      result_id: resultId,
      marks,
      comments
    });
    return data;
  }

  static async sendExamResults(examId?: string) {
    const { data } = await apiClient.post<ActionResponse>(
      `management/exams/${examId}/send-results`
    );
    return data;
  }
}
export default ExamManagementService;
