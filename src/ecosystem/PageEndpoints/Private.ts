export const ADMIN_PRIVATE_ENDPOINTS = {
  DASHBOARD: '/admin',
  STUDENT_MANAGEMENT: '/admin/student-management',
  STUDENT_DETAIL: '/admin/student-management/:id',
  STUDENT_CLASS_ENROLLMENT: '/admin/student-class-enrollment',
  STAFF_MANAGEMENT: '/admin/staff-management',
  STAFF_CREATE: '/admin/staff-management/new',
  STAFF_DETAIL: '/admin/staff-management/:id',
  CLASS_MANAGEMENT: '/admin/class-management',
  CLASS_MANAGEMENT_CREATE: '/admin/class-management/new',
  CLASS_MANAGEMENT_EDIT: '/admin/class-management/:id/edit',
  CLASS_MANAGEMENT_DETAIL: '/admin/class-management/:id',
  COURSE_MANAGEMENT: '/admin/course-management',
  COURSE_CREATE: '/admin/course-management/new',
  SUBJECT_MANAGEMENT: '/admin/subject-management',
  SUBJECT_CREATE: '/admin/subject-management/new',
  EXAM_MANAGEMENT: '/admin/exam-management',
  EXAM_RESULT_DETAIL: '/admin/exam-management/:examId/results/:resultId/students/:studentId',
  EXAM_RESULT_DETAIL_MANUAL_GRADING:
    '/admin/exam-management/:examId/results/:resultId/students/:studentId/manual-grading',
  EXAM_CREATE: '/admin/exam-management/new',
  EXAM_DETAIL: '/admin/exam-management/:id',
  EXAM_QUESTION_UPLOAD: '/admin/exam-management/:id/upload-questions',
  CLASS_SCHEDULE_MANAGEMENT: '/admin/class-schedule-management',
  CLASS_SCHEDULE_CREATE: '/admin/class-schedule-management/new',
  GENERAL_SETTING_MANAGEMENT: '/admin/general-setting-management',
  PROFILE: '/admin/profile',
  SETTINGS: '/admin/settings'
} as const;

export const STUDENT_PRIVATE_ENDPOINTS = {
  DASHBOARD: '/student',
  PROFILE: '/student/profile',
  CLASS_LIST: '/student/class-list',
  CLASS_DETAIL: '/student/class-list/:id',
  EXAM_FORM: '/student/exam-form/:id',
  EXAM_LIST: '/student/exam-list',
  EXAM_RESULT_DETAIL: '/student/exam-list/:id'
} as const;

export type AdminPrivateEndpoints = typeof ADMIN_PRIVATE_ENDPOINTS;
export type StudentPrivateEndpoints = typeof STUDENT_PRIVATE_ENDPOINTS;

export const goToDynamicRoute = (endpoint: string, id: string) => {
  return `${endpoint}/${id}`;
};
