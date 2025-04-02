import type { StudentFilterParams } from '@/modules/StudentManagement/schemas/studentManagement.schema';
import { StudentSortBy } from '@/modules/StudentManagement/types/studentManagement.types';
import { SortDirection } from '@/shared/types';

export const getDefaultFilters = (): StudentFilterParams => {
  return {
    per_page: 15,
    sort_by: StudentSortBy.CreatedAt,
    sort_direction: SortDirection.Desc
  };
};
