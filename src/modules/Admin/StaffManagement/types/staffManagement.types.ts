import { ApiResponse } from '@/shared/types';

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

export enum StaffGender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum StaffSortBy {
  Name = 'name',
  Email = 'email',
  Role = 'role',
  JoinedDate = 'joined_date',
  Status = 'status',
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at'
}

export interface DateRangeFilter {
  start: string;
  end: string;
}

export type Staff = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: StaffGender;
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
