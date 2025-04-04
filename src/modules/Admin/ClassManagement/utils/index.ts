import type { ClassFilterFormValues } from '@/modules/Admin/ClassManagement/schemas/class.schema';
import { ClassSortBy } from '@/modules/Admin/ClassManagement/types/class.types';
import { SortDirection } from '@/shared/types';

export const createDefaultFilterParams = (): ClassFilterFormValues => ({
  per_page: 15,
  current_page: 1,
  sort_by: ClassSortBy.CreatedAt,
  sort_order: SortDirection.Desc
});
