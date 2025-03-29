export const PUBLIC_ENDPOINTS = {
  LOGIN: '/login',
  NOT_FOUND: '*'
} as const;

export type PublicEndpoints = typeof PUBLIC_ENDPOINTS;
