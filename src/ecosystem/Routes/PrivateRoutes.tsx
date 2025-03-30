import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() =>
  import('@/modules/Dashboard/components/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage
  }))
);

const StaffManagementPage = lazy(() =>
  import('@/modules/StaffManagement/components/pages/StaffManagementPage').then((module) => ({
    default: module.StaffManagementPage
  }))
);

const StaffCreatePage = lazy(() =>
  import('@/modules/StaffManagement/components/pages/StaffCreatePage').then((module) => ({
    default: module.StaffCreatePage
  }))
);

const StaffDetailPage = lazy(() =>
  import('@/modules/StaffManagement/components/pages/StaffDetailPage').then((module) => ({
    default: module.StaffDetailPage
  }))
);

export const privateRoutes: RouteObject[] = [
  {
    path: PRIVATE_ENDPOINTS.DASHBOARD,
    element: <DashboardPage />
  },
  {
    path: PRIVATE_ENDPOINTS.STAFF_MANAGEMENT,
    element: <StaffManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.STAFF_CREATE,
    element: <StaffCreatePage />
  },
  {
    path: PRIVATE_ENDPOINTS.STAFF_DETAIL,
    element: <StaffDetailPage />
  }
];
