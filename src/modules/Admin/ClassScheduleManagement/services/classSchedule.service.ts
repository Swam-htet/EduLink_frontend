import { apiClient } from '@/lib/axios/api';
import { ClassScheduleFilterFormValues } from '@/modules/Admin/ClassScheduleManagement/components/forms/ClassScheduleFilter';
import { CreateClassScheduleFormData } from '@/modules/Admin/ClassScheduleManagement/types/classSchedule.types';
import { ActionResponse } from '@/types';

export class ClassScheduleService {
  static async createSchedules(data: CreateClassScheduleFormData) {
    const response = await apiClient.post<ActionResponse>('management/class-schedules', data);
    return response.data;
  }

  static async getSchedules(filterParams: ClassScheduleFilterFormValues) {
    const response = await apiClient.get(
      `management/class-schedules/classes/${filterParams.class_id}`
    );
    return response.data;
  }
}
