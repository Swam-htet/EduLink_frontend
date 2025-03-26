export const PRIVATE_ENDPOINTS = {
  HOME: '/',
  PROFILE: '/profile'
} as const;

export type PrivateEndpoints = typeof PRIVATE_ENDPOINTS;
