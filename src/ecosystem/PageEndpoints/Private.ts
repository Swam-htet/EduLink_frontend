export const PRIVATE_ENDPOINTS = {
  HOME: '/',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  STUDENT_MANAGEMENT: '/student-management',
  STUDENT_CLASS_ENROLLMENT: '/student-class-enrollment',
  STUDENT_CLASS_ATTENDANCE: '/student-class-attendance',
  STAFF_MANAGEMENT: '/staff-management',
  CLASS_MANAGEMENT: '/class-management',
  CLASS_SCHEDULE_MANAGEMENT: '/class-schedule-management',
  SUBJECT_MANAGEMENT: '/subject-management',
  COURSE_MANAGEMENT: '/course-management',
  EXAM_MANAGEMENT: '/exam-management',

  SETTINGS: '/settings'
} as const;

export type PrivateEndpoints = typeof PRIVATE_ENDPOINTS;
