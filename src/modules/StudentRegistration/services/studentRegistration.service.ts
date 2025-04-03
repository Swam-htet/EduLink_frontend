import { apiClient } from '@/lib/axios/api';
import type { StudentRegistrationFormData } from '@/modules/StudentRegistration/schemas/student.schema';
import type { StudentRegistrationResponse } from '@/modules/StudentRegistration/types/student.types';

export class StudentRegistrationService {
  static async registerStudent(formData: StudentRegistrationFormData) {
    // Create FormData for file upload
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== 'profile_photo' && key !== 'confirm_password') {
        data.append(key, formData[key as keyof StudentRegistrationFormData] as string);
      }
    });

    if (formData.profile_photo && formData.profile_photo instanceof File) {
      data.append('profile_photo', formData.profile_photo);
    }

    const response = await apiClient.post<StudentRegistrationResponse>('/students/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }
}

export default StudentRegistrationService;
