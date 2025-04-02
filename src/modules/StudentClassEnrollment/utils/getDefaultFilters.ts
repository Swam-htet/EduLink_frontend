import type { EnrollmentFilterFormData } from '@/modules/StudentClassEnrollment/schemas/enrollment.schema';
import { EnrollmentSortBy } from '@/modules/StudentClassEnrollment/types/enrollment.types';
import { SortDirection } from '@/shared/types';

export const getDefaultFilters = (): EnrollmentFilterFormData => ({
  per_page: 15,
  sort_by: EnrollmentSortBy.CREATED_AT,
  sort_direction: SortDirection.Desc
});
