import { ClassDetailPage } from '@/modules/ClassManagement/components/pages/ClassDetailPage';
import { ClassEditPage } from '@/modules/ClassManagement/components/pages/ClassEditPage';
import { EnrollmentManagementPage } from '@/modules/StudentClassEnrollment/components/pages/EnrollmentManagementPage';

// In your routes configuration
{
  path: '/class-management/:id',
  element: <ClassDetailPage />
}

export const routes = [
  // ... other routes
  {
    path: '/class-management/:id/edit',
    element: <ClassEditPage />
  },
  {
    path: '/class-enrollments',
    element: <EnrollmentManagementPage />
  }
]; 