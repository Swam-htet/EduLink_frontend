export const PUBLIC_ENDPOINTS = {
  LOGIN: '/login',
  STUDENT_REGISTRATION: '/student-registration',
  REGISTRATION_SUCCESS: '/student-registration/success',
  NOT_FOUND: '*'
} as const;

export type PublicEndpoints = typeof PUBLIC_ENDPOINTS;
