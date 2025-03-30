import { apiClient } from '@/lib/axios/api';

import { cleanObject } from '@/lib/utils';
import type { CourseCreateFormData } from '@/modules/CourseManagement/schemas/course.schema';
import type {
  CourseFilterParams,
  CourseListResponse,
  CourseResponse
} from '@/modules/CourseManagement/types/course.types';

export class CourseManagementService {
  static async getCourses(params?: CourseFilterParams) {
    const { data } = await apiClient.get<CourseListResponse>('management/courses', {
      params: params ? cleanObject(params as Record<string, unknown>) : undefined
    });
    return data;
  }

  static async getCourseById(id: string) {
    const { data } = await apiClient.get<CourseResponse>(`management/courses/${id}`);
    return data;
  }

  static async createCourse(courseData: CourseCreateFormData) {
    const { data } = await apiClient.post<CourseResponse>('management/courses', courseData);
    return data;
  }

  static async updateCourse(id: string, courseData: Partial<CourseCreateFormData>) {
    const { data } = await apiClient.put<CourseResponse>(`management/courses/${id}`, courseData);
    return data;
  }

  static async deleteCourse(id: string) {
    const { data } = await apiClient.delete<CourseResponse>(`management/courses/${id}`);
    return data;
  }
}

export default CourseManagementService;
