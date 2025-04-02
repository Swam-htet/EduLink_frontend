import { StaffFilterFormValues } from '@/modules/StaffManagement/schemas/staff.schema';
import { StaffSortBy } from '@/modules/StaffManagement/types/staffManagement.types';
import { SortDirection } from '@/shared/types';

export const createDefaultFilterParams = (): StaffFilterFormValues => ({
  per_page: 15,
  current_page: 1,
  sort_by: StaffSortBy.CreatedAt,
  sort_direction: SortDirection.Desc
});
