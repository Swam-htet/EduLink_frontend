export const PUBLIC_ENDPOINTS = {
  LANDING: '/',
  TENANT_LANDING: '/tenant',
  ADMIN_LOGIN: '/admin/login',
  STUDENT_LOGIN: '/student/login',
  STUDENT_REGISTRATION: '/student-registration',
  REGISTRATION_SUCCESS: '/student-registration/success',
  NOT_FOUND: '*',
  TERMS_AND_CONDITIONS: '/terms-and-conditions'
} as const;

export type PublicEndpoints = typeof PUBLIC_ENDPOINTS;
