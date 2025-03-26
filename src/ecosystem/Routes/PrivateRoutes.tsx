import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load components
const HomePage = lazy(() =>
  import('@/modules/Home/components/pages').then((module) => ({
    default: module.HomePage
  }))
);

const ProfilePage = lazy(() =>
  import('@/modules/Profile/components/pages/ProfilePage').then((module) => ({
    default: module.ProfilePage
  }))
);

export const privateRoutes: RouteObject[] = [
  {
    path: PRIVATE_ENDPOINTS.HOME,
    element: <HomePage />
  },
  {
    path: PRIVATE_ENDPOINTS.PROFILE,
    element: <ProfilePage />
  }
];
