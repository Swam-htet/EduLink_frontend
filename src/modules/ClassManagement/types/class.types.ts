import { Student } from '@/modules/StudentManagement/types/studentManagement.types';
import { Subject } from '@/modules/SubjectManagement/types/subject.types';

export enum ClassStatus {
  Scheduled = 'scheduled',
  Ongoing = 'ongoing',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface Class {
  id: number;
  name: string;
  code: string;
  description: string;
  start_date: string;
  end_date: string;
  capacity: number;
  status: ClassStatus;
  course?: {
    id: number;
    title: string;
  };
  subjects?: Subject[];
  students?: Student[];
  teacher?: {
    id: number;
    first_name: string;
    last_name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ClassListResponse {
  data: Class[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface ClassResponse {
  data: Class;
  message?: string;
}

export enum ClassSortBy {
  Name = 'name',
  Code = 'code',
  Status = 'status',
  Course = 'course',
  Teacher = 'teacher',
  Subject = 'subject',
  StartDate = 'start_date',
  EndDate = 'end_date',
  Capacity = 'capacity',
  CreatedAt = 'created_at'
}
