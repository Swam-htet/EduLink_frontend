import {
  CourseFilterParams,
  CourseSortBy
} from '@/modules/Admin/CourseManagement/types/course.types';
import { SortDirection } from '@/shared/types';

export const getDefaultFilters = (): CourseFilterParams => {
  return {
    sort_by: CourseSortBy.CREATED_AT,
    sort_direction: SortDirection.Desc
  };
};
