import type { StudentFilterParams } from '@/modules/Admin/StudentManagement/schemas/studentManagement.schema';
import { StudentSortBy } from '@/modules/Admin/StudentManagement/types/studentManagement.types';
import { SortDirection } from '@/shared/types';

export const getDefaultFilters = (): StudentFilterParams => {
  return {
    per_page: 15,
    sort_by: StudentSortBy.CreatedAt,
    sort_direction: SortDirection.Desc
  };
};
