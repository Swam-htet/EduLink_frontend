import {
  DateRangeFilter,
  StaffManagementFilterParams
} from '@/modules/StaffManagement/types/staffManagement.types';
import { SortDirection } from '@/shared/types';

// Helper function to validate date range
export const isValidDateRange = (range?: DateRangeFilter): boolean => {
  if (!range) return true;
  const start = new Date(range.start);
  const end = new Date(range.end);
  return start <= end;
};

// Helper function to validate filter params
export const validateFilterParams = (params: StaffManagementFilterParams): boolean => {
  // Validate per_page
  if (params.per_page && (params.per_page < 1 || params.per_page > 100)) {
    return false;
  }

  // Validate date ranges
  if (!isValidDateRange(params.date_of_birth) || !isValidDateRange(params.joined_date)) {
    return false;
  }

  return true;
};

// Example usage of filter params
export const createDefaultFilterParams = (): StaffManagementFilterParams => ({
  per_page: 15,
  current_page: 1,
  sort_by: 'created_at',
  sort_direction: SortDirection.Desc
});
