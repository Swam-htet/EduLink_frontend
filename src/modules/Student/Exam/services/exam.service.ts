import { apiClient } from '@/lib/axios/api';
import {
  ExamAnswer,
  ExamListResponse,
  ExamQuestionResponse,
  ExamResultResponse
} from '@/modules/Student/Exam/types/exam.types';
import { ActionResponse } from '@/types';

export class ExamService {
  static async getExamById(id: string) {
    const { data } = await apiClient.get<ExamQuestionResponse>(`student/exams/${id}`);
    return data;
  }

  static async submitExam(id: string, answers: ExamAnswer[]) {
    const { data } = await apiClient.post<ActionResponse>(`student/exams/${id}/submit`, {
      answers
    });
    return data;
  }

  static async getExamsByClassId(classId: string) {
    const { data } = await apiClient.get<ExamListResponse>(`student/exams/classes/${classId}`);
    return data;
  }

  static async getExamResultById(examId: string) {
    const { data } = await apiClient.get<ExamResultResponse>(`student/exams/${examId}/result`);
    return data;
  }
}

export default ExamService;
