import { ApiResponse, SortDirection } from '@/shared/types';

// Enum types for strict type checking
export enum StaffStatus {
  Active = 'active',
  Inactive = 'inactive'
}

export enum StaffRole {
  Teacher = 'teacher',
  Admin = 'admin',
  Staff = 'staff'
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// Valid sort fields
export type SortableFields =
  | 'name'
  | 'email'
  | 'role'
  | 'joined_date'
  | 'status'
  | 'created_at'
  | 'updated_at';

// Date range filter type
export interface DateRangeFilter {
  start: string;
  end: string;
}

// Main filter params interface
export interface StaffManagementFilterParams {
  // Basic Filters
  name?: string;
  email?: string;
  phone?: string;
  nrc?: string;

  // Status and Role Filters
  status?: StaffStatus;
  role?: StaffRole;
  gender?: Gender;

  // Date Range Filters
  date_of_birth?: DateRangeFilter;
  joined_date?: DateRangeFilter;

  // Pagination and Sorting
  per_page?: number;
  current_page?: number;
  sort_by?: SortableFields;
  sort_direction?: SortDirection;
}

// Staff type definition (existing)
export type Staff = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: Gender;
  nrc: string;
  profile_photo: string | null;
  date_of_birth: string;
  address: string;
  role: StaffRole;
  joined_date: string;
  status: StaffStatus;
  qualifications: string | null;
  created_at: string;
  updated_at: string;
};

export type StaffManagementCreateResponse = ApiResponse<Staff>;

export type StaffManagementListResponse = ApiResponse<Staff[]>;

export type StaffManagementDetailResponse = ApiResponse<Staff>;

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
