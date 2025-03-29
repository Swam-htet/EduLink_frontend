import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load components
const LoginPage = lazy(() =>
  import('@/modules/Auth/components/pages').then((module) => ({
    default: module.LoginPage
  }))
);

const NotFound = lazy(() =>
  import('@/shared/components/pages').then((module) => ({
    default: module.NotFoundPage
  }))
);

export const publicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ENDPOINTS.LOGIN,
    element: <LoginPage />
  },
  {
    path: PUBLIC_ENDPOINTS.NOT_FOUND,
    element: <NotFound />
  }
];
