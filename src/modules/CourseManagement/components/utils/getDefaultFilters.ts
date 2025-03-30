import { CourseFilterParams } from '@/modules/CourseManagement/types/course.types';

export const getDefaultFilters = (): CourseFilterParams => {
  return {
    sort_by: 'created_at',
    sort_direction: 'desc'
  };
};
