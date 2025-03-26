export const PUBLIC_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  NOT_FOUND: '*'
} as const;

export type PublicEndpoints = typeof PUBLIC_ENDPOINTS;
