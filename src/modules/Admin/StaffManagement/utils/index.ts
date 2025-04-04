import { StaffFilterFormValues } from '@/modules/Admin/StaffManagement/schemas/staff.schema';
import { StaffSortBy } from '@/modules/Admin/StaffManagement/types/staffManagement.types';
import { SortDirection } from '@/types';

export const createDefaultFilterParams = (): StaffFilterFormValues => ({
  per_page: 15,
  current_page: 1,
  sort_by: StaffSortBy.CreatedAt,
  sort_direction: SortDirection.Desc
});
