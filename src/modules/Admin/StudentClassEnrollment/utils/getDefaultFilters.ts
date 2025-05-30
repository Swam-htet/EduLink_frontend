import type { EnrollmentFilterFormData } from '@/modules/Admin/StudentClassEnrollment/schemas/enrollment.schema';
import { EnrollmentSortBy } from '@/modules/Admin/StudentClassEnrollment/types/enrollment.types';
import { SortDirection } from '@/types';

export const getDefaultFilters = (): EnrollmentFilterFormData => ({
  per_page: 15,
  sort_by: EnrollmentSortBy.CREATED_AT,
  sort_direction: SortDirection.Desc
});
