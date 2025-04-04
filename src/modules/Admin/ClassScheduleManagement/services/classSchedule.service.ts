import { apiClient } from '@/lib/axios/api';
import { CreateClassScheduleFormData } from '@/modules/Admin/ClassScheduleManagement/types/classSchedule.types';

export class ClassScheduleService {
  static async createSchedules(data: CreateClassScheduleFormData) {
    const response = await apiClient.post('management/class-schedules', data);
    return response.data;
  }

  static async getSchedules() {
    const response = await apiClient.get('management/class-schedules');
    return response.data;
  }
}
