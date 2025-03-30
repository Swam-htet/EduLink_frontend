import type { StudentFilterParams } from '@/modules/StudentManagement/types/studentManagement.types';

export const getDefaultFilters = (): StudentFilterParams => {
  return {
    per_page: 15,
    sort_by: 'created_at',
    sort_direction: 'desc'
  };
};
