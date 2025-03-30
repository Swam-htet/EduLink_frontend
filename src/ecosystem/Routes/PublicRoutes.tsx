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

const StudentRegistrationPage = lazy(() =>
  import('@/modules/StudentRegistration/components/pages').then((module) => ({
    default: module.StudentRegistrationPage
  }))
);

const RegistrationSuccessPage = lazy(() =>
  import('@/modules/StudentRegistration/components/pages').then((module) => ({
    default: module.RegistrationSuccessPage
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
  },
  {
    path: PUBLIC_ENDPOINTS.STUDENT_REGISTRATION,
    element: <StudentRegistrationPage />
  },
  {
    path: PUBLIC_ENDPOINTS.REGISTRATION_SUCCESS,
    element: <RegistrationSuccessPage />
  }
];
