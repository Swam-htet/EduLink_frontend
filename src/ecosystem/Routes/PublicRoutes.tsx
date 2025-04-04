import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// admin routes
const AdminLoginPage = lazy(() =>
  import('@/modules/Admin/Auth/components/pages').then((module) => ({
    default: module.LoginPage
  }))
);

// student routes
const StudentLoginPage = lazy(() =>
  import('@/modules/Student/Auth/components/pages').then((module) => ({
    default: module.LoginPage
  }))
);

// not found page
const NotFound = lazy(() =>
  import('@/components/pages').then((module) => ({
    default: module.NotFoundPage
  }))
);

// student registration page
const StudentRegistrationPage = lazy(() =>
  import('@/modules/Admin/StudentRegistration/components/pages').then((module) => ({
    default: module.StudentRegistrationPage
  }))
);

// student registration success page
const RegistrationSuccessPage = lazy(() =>
  import('@/modules/Admin/StudentRegistration/components/pages').then((module) => ({
    default: module.RegistrationSuccessPage
  }))
);

export const publicRoutes: RouteObject[] = [
  // admin routes
  {
    path: PUBLIC_ENDPOINTS.ADMIN_LOGIN,
    element: <AdminLoginPage />
  },
  // student routes
  {
    path: PUBLIC_ENDPOINTS.STUDENT_LOGIN,
    element: <StudentLoginPage />
  },
  // not found page
  {
    path: PUBLIC_ENDPOINTS.NOT_FOUND,
    element: <NotFound />
  },
  // student registration page
  {
    path: PUBLIC_ENDPOINTS.STUDENT_REGISTRATION,
    element: <StudentRegistrationPage />
  },
  // student registration success page
  {
    path: PUBLIC_ENDPOINTS.REGISTRATION_SUCCESS,
    element: <RegistrationSuccessPage />
  }
];
