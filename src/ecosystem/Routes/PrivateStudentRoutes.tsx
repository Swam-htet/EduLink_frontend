import { RouteObject } from 'react-router-dom';

import { STUDENT_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { lazy } from 'react';

const ProfilePage = lazy(() =>
  import('@/modules/Student/Profile/components/pages/ProfilePage').then((module) => ({
    default: module.ProfilePage
  }))
);

export const privateStudentRoutes: RouteObject[] = [
  {
    path: STUDENT_PRIVATE_ENDPOINTS.PROFILE,
    element: <ProfilePage />
  }
];
