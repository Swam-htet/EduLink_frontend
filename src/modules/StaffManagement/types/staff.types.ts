export interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  nrc: string;
  profile_photo: string | null;
  date_of_birth: string;
  address: string;
  role: string;
  joined_date: string;
  status: string;
  qualifications: string | null;
  created_at: string;
  updated_at: string;
}

export interface StaffResponse {
  data: Staff;
  message: string;
  status: number;
}
