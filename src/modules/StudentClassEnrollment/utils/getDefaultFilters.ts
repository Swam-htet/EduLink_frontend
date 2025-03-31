import type { EnrollmentFilterParams } from '../types/enrollment.types';

export const getDefaultFilters = (): EnrollmentFilterParams => ({
  per_page: 15,
  sort_by: 'created_at',
  sort_direction: 'desc'
});
