import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load components
const LoginPage = lazy(() =>
  import('@/modules/Auth/components/pages').then((module) => ({
    default: module.LoginPage
  }))
);

const RegisterPage = lazy(() =>
  import('@/modules/Auth/components/pages').then((module) => ({
    default: module.RegisterPage
  }))
);

const ForgotPasswordPage = lazy(() =>
  import('@/modules/Auth/components/pages').then((module) => ({
    default: module.ForgotPasswordPage
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
    path: PUBLIC_ENDPOINTS.REGISTER,
    element: <RegisterPage />
  },
  {
    path: PUBLIC_ENDPOINTS.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />
  },
  {
    path: PUBLIC_ENDPOINTS.NOT_FOUND,
    element: <NotFound />
  }
];
