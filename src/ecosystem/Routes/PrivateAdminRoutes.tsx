import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() =>
  import('@/modules/Admin/Dashboard/components/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage
  }))
);

const StaffManagementPage = lazy(() =>
  import('@/modules/Admin/StaffManagement/components/pages/StaffManagementPage').then((module) => ({
    default: module.StaffManagementPage
  }))
);

const StaffCreatePage = lazy(() =>
  import('@/modules/Admin/StaffManagement/components/pages/StaffCreatePage').then((module) => ({
    default: module.StaffCreatePage
  }))
);

const StaffDetailPage = lazy(() =>
  import('@/modules/Admin/StaffManagement/components/pages/StaffDetailPage').then((module) => ({
    default: module.StaffDetailPage
  }))
);

const CourseManagementPage = lazy(() =>
  import('@/modules/Admin/CourseManagement/components/pages/CourseManagementPage').then(
    (module) => ({
      default: module.CourseManagementPage
    })
  )
);

const CourseCreatePage = lazy(() =>
  import('@/modules/Admin/CourseManagement/components/pages/CourseCreatePage').then((module) => ({
    default: module.CourseCreatePage
  }))
);

const SubjectManagementPage = lazy(() =>
  import('@/modules/Admin/SubjectManagement/components/pages/SubjectManagementPage').then(
    (module) => ({
      default: module.SubjectManagementPage
    })
  )
);

const SubjectCreatePage = lazy(() =>
  import('@/modules/Admin/SubjectManagement/components/pages/SubjectCreatePage').then((module) => ({
    default: module.SubjectCreatePage
  }))
);

const StudentManagementPage = lazy(() =>
  import('@/modules/Admin/StudentManagement/components/pages/StudentManagementPage').then(
    (module) => ({
      default: module.StudentManagementPage
    })
  )
);

const StudentDetailPage = lazy(() =>
  import('@/modules/Admin/StudentManagement/components/pages/StudentDetailPage').then((module) => ({
    default: module.StudentDetailPage
  }))
);

const ClassManagementPage = lazy(() =>
  import('@/modules/Admin/ClassManagement/components/pages/ClassManagementPage').then((module) => ({
    default: module.ClassManagementPage
  }))
);

const ClassCreatePage = lazy(() =>
  import('@/modules/Admin/ClassManagement/components/pages/ClassCreatePage').then((module) => ({
    default: module.ClassCreatePage
  }))
);

const ClassEditPage = lazy(() =>
  import('@/modules/Admin/ClassManagement/components/pages/ClassEditPage').then((module) => ({
    default: module.ClassEditPage
  }))
);

const ClassDetailPage = lazy(() =>
  import('@/modules/Admin/ClassManagement/components/pages/ClassDetailPage').then((module) => ({
    default: module.ClassDetailPage
  }))
);

const StudentClassEnrollmentPage = lazy(() =>
  import('@/modules/Admin/StudentClassEnrollment/components/pages/StudentClassEnrollmentPage').then(
    (module) => ({
      default: module.StudentClassEnrollmentPage
    })
  )
);

const ExamManagementPage = lazy(() =>
  import('@/modules/Admin/ExamManagement/components/pages/ExamManagementPage').then((module) => ({
    default: module.ExamManagementPage
  }))
);

const ExamCreatePage = lazy(() =>
  import('@/modules/Admin/ExamManagement/components/pages/ExamCreatePage').then((module) => ({
    default: module.ExamCreatePage
  }))
);

const ExamDetailPage = lazy(() =>
  import('@/modules/Admin/ExamManagement/components/pages/ExamDetailPage').then((module) => ({
    default: module.ExamDetailPage
  }))
);

const ExamQuestionUploadPage = lazy(() =>
  import('@/modules/Admin/ExamManagement/components/pages/ExamQuestionUploadPage').then(
    (module) => ({
      default: module.ExamQuestionUploadPage
    })
  )
);

const ClassScheduleManagementPage = lazy(() =>
  import(
    '@/modules/Admin/ClassScheduleManagement/components/pages/ClassScheduleManagementPage'
  ).then((module) => ({
    default: module.ClassScheduleManagementPage
  }))
);

const ClassScheduleCreatePage = lazy(() =>
  import('@/modules/Admin/ClassScheduleManagement/components/pages/ClassScheduleCreatePage').then(
    (module) => ({
      default: module.ClassScheduleCreatePage
    })
  )
);

export const privateAdminRoutes: RouteObject[] = [
  {
    path: ADMIN_PRIVATE_ENDPOINTS.DASHBOARD,
    element: <DashboardPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.STAFF_MANAGEMENT,
    element: <StaffManagementPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.STAFF_CREATE,
    element: <StaffCreatePage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.STAFF_DETAIL,
    element: <StaffDetailPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.COURSE_MANAGEMENT,
    element: <CourseManagementPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.COURSE_CREATE,
    element: <CourseCreatePage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.SUBJECT_MANAGEMENT,
    element: <SubjectManagementPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.SUBJECT_CREATE,
    element: <SubjectCreatePage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.STUDENT_MANAGEMENT,
    element: <StudentManagementPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.STUDENT_DETAIL,
    element: <StudentDetailPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT,
    element: <ClassManagementPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_CREATE,
    element: <ClassCreatePage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_EDIT,
    element: <ClassEditPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_DETAIL,
    element: <ClassDetailPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.STUDENT_CLASS_ENROLLMENT,
    element: <StudentClassEnrollmentPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT,
    element: <ExamManagementPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.EXAM_CREATE,
    element: <ExamCreatePage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.EXAM_DETAIL,
    element: <ExamDetailPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.EXAM_QUESTION_UPLOAD,
    element: <ExamQuestionUploadPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.CLASS_SCHEDULE_MANAGEMENT,
    element: <ClassScheduleManagementPage />
  },
  {
    path: ADMIN_PRIVATE_ENDPOINTS.CLASS_SCHEDULE_CREATE,
    element: <ClassScheduleCreatePage />
  }
];
