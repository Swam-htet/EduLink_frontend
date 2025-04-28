import { Student } from '@/modules/Admin/StudentManagement/types/studentManagement.types';
import { Subject } from '@/modules/Admin/SubjectManagement/types/subject.types';
import { Tutor } from '@/modules/Student/Class/types/class.types';

export enum ClassStatus {
  Scheduled = 'scheduled',
  Ongoing = 'ongoing',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface Schedule {
  id: number;
  class: Class;
  subject: Subject;
  tutor: Tutor;
  schedule_details: {
    schedule_status: string;
    start_date: string;
    end_date: string;
    late_mins: number;
  };
  status: string;
  created_at: string;
  updated_at: string;
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
  schedules?: Schedule[];
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
