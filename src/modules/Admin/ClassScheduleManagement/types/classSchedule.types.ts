export interface ClassSchedule {
  id: number;
  class: {
    id: number;
    name: string;
    code: string;
  };
  subject: {
    id: number;
    title: string;
    code: string;
  };
  tutor: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  schedule_details: {
    schedule_status: 'scheduled' | 'completed' | 'cancelled';
    start_date: string;
    end_date: string;
    late_mins: number;
  };
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CreateClassScheduleData {
  class_id: string;
  subject_id: string;
  staff_id: string;
  schedules: {
    date: string;
    start_time: string;
    end_time: string;
    late_mins: string;
  }[];
}

export interface CreateClassScheduleRequest {
  schedules: CreateClassScheduleData[];
}

export interface CreateClassScheduleFormData {
  schedules: {
    class_id: string;
    subject_id: string;
    staff_id: string;
    date: string;
    start_time: string;
    end_time: string;
    late_mins: string;
  }[];
}
