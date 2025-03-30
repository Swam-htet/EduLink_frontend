export const PRIVATE_ENDPOINTS = {
  DASHBOARD: '/',
  STUDENT_MANAGEMENT: '/student-management',
  STUDENT_CLASS_ENROLLMENT: '/student-class-enrollment',
  STUDENT_CLASS_ATTENDANCE: '/student-class-attendance',
  STAFF_MANAGEMENT: '/staff-management',
  STAFF_CREATE: '/staff-management/new',
  STAFF_DETAIL: '/staff-management/:id',
  CLASS_MANAGEMENT: '/class-management',
  CLASS_SCHEDULE_MANAGEMENT: '/class-schedule-management',
  COURSE_MANAGEMENT: '/course-management',
  COURSE_CREATE: '/course-management/new',
  SUBJECT_MANAGEMENT: '/subject-management',
  SUBJECT_CREATE: '/subject-management/new',
  EXAM_MANAGEMENT: '/exam-management',

  SETTINGS: '/settings'
} as const;

export type PrivateEndpoints = typeof PRIVATE_ENDPOINTS;
