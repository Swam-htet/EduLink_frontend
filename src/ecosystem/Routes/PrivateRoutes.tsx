import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() =>
  import('@/modules/Dashboard/components/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage
  }))
);

const StudentManagementPage = lazy(() =>
  import('@/modules/StudentManagement/components/pages/StudentManagementPage').then((module) => ({
    default: module.StudentManagementPage
  }))
);

const StudentClassEnrollmentPage = lazy(() =>
  import('@/modules/StudentClassEnrollment/components/pages/StudentClassEnrollmentPage').then(
    (module) => ({
      default: module.StudentClassEnrollmentPage
    })
  )
);

const StudentClassAttendancePage = lazy(() =>
  import('@/modules/StudentClassAttendance/components/pages/StudentClassAttendancePage').then(
    (module) => ({
      default: module.StudentClassAttendancePage
    })
  )
);

const ClassScheduleManagementPage = lazy(() =>
  import('@/modules/ClassScheduleManagement/components/pages/ClassScheduleManagementPage').then(
    (module) => ({
      default: module.ClassScheduleManagementPage
    })
  )
);

const ClassManagementPage = lazy(() =>
  import('@/modules/ClassManagement/components/pages/ClassManagementPage').then((module) => ({
    default: module.ClassManagementPage
  }))
);

const CourseManagementPage = lazy(() =>
  import('@/modules/CourseManagement/components/pages/CourseManagementPage').then((module) => ({
    default: module.CourseManagementPage
  }))
);

const StaffManagementPage = lazy(() =>
  import('@/modules/StaffManagement/components/pages/StaffManagementPage').then((module) => ({
    default: module.StaffManagementPage
  }))
);

const SubjectManagementPage = lazy(() =>
  import('@/modules/SubjectManagement/components/pages/SubjectManagementPage').then((module) => ({
    default: module.SubjectManagementPage
  }))
);

export const privateRoutes: RouteObject[] = [
  {
    path: PRIVATE_ENDPOINTS.STUDENT_MANAGEMENT,
    element: <StudentManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.DASHBOARD,
    element: <DashboardPage />
  },
  {
    path: PRIVATE_ENDPOINTS.STUDENT_CLASS_ENROLLMENT,
    element: <StudentClassEnrollmentPage />
  },
  {
    path: PRIVATE_ENDPOINTS.STUDENT_CLASS_ATTENDANCE,
    element: <StudentClassAttendancePage />
  },
  {
    path: PRIVATE_ENDPOINTS.CLASS_SCHEDULE_MANAGEMENT,
    element: <ClassScheduleManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.CLASS_MANAGEMENT,
    element: <ClassManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.COURSE_MANAGEMENT,
    element: <CourseManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.STAFF_MANAGEMENT,
    element: <StaffManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.SUBJECT_MANAGEMENT,
    element: <SubjectManagementPage />
  }
];
