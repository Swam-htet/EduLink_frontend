import { apiClient } from '@/lib/axios/api';
import type {
  ClassListResponse,
  ClassScheduleListResponse
} from '@/modules/Student/Class/types/class.types';
import { ActionResponse } from '@/types';

export class ClassService {
  static async getAllOngoingClassesForStudent() {
    const { data } = await apiClient.get<ClassListResponse>('student/classes');
    return data;
  }

  static async getClassSchedulesByClassId(classId: string) {
    const { data } = await apiClient.get<ClassScheduleListResponse>(
      `student/class-schedules/classes/${classId}`
    );
    return data;
  }

  static async makeAttendance(classScheduleId: string) {
    const { data } = await apiClient.post<ActionResponse>(
      `student/class-schedules/${classScheduleId}/attendance`
    );
    return data;
  }
}

export default ClassService;
