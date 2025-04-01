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

const CourseManagementPage = lazy(() =>
  import('@/modules/CourseManagement/components/pages/CourseManagementPage').then((module) => ({
    default: module.CourseManagementPage
  }))
);

const CourseCreatePage = lazy(() =>
  import('@/modules/CourseManagement/components/pages/CourseCreatePage').then((module) => ({
    default: module.CourseCreatePage
  }))
);

const SubjectManagementPage = lazy(() =>
  import('@/modules/SubjectManagement/components/pages/SubjectManagementPage').then((module) => ({
    default: module.SubjectManagementPage
  }))
);

const SubjectCreatePage = lazy(() =>
  import('@/modules/SubjectManagement/components/pages/SubjectCreatePage').then((module) => ({
    default: module.SubjectCreatePage
  }))
);

const StudentManagementPage = lazy(() =>
  import('@/modules/StudentManagement/components/pages/StudentManagementPage').then((module) => ({
    default: module.StudentManagementPage
  }))
);

const StudentDetailPage = lazy(() =>
  import('@/modules/StudentManagement/components/pages/StudentDetailPage').then((module) => ({
    default: module.StudentDetailPage
  }))
);

const ClassManagementPage = lazy(() =>
  import('@/modules/ClassManagement/components/pages/ClassManagementPage').then((module) => ({
    default: module.ClassManagementPage
  }))
);

const ClassCreatePage = lazy(() =>
  import('@/modules/ClassManagement/components/pages/ClassCreatePage').then((module) => ({
    default: module.ClassCreatePage
  }))
);

const ClassEditPage = lazy(() =>
  import('@/modules/ClassManagement/components/pages/ClassEditPage').then((module) => ({
    default: module.ClassEditPage
  }))
);

const ClassDetailPage = lazy(() =>
  import('@/modules/ClassManagement/components/pages/ClassDetailPage').then((module) => ({
    default: module.ClassDetailPage
  }))
);

const StudentClassEnrollmentPage = lazy(() =>
  import('@/modules/StudentClassEnrollment/components/pages/StudentClassEnrollmentPage').then(
    (module) => ({
      default: module.StudentClassEnrollmentPage
    })
  )
);

const ExamManagementPage = lazy(() =>
  import('@/modules/ExamManagement/components/pages/ExamManagementPage').then((module) => ({
    default: module.ExamManagementPage
  }))
);

const ExamCreatePage = lazy(() =>
  import('@/modules/ExamManagement/components/pages/ExamCreatePage').then((module) => ({
    default: module.ExamCreatePage
  }))
);

const ExamDetailPage = lazy(() =>
  import('@/modules/ExamManagement/components/pages/ExamDetailPage').then((module) => ({
    default: module.ExamDetailPage
  }))
);

const ExamQuestionUploadPage = lazy(() =>
  import('@/modules/ExamManagement/components/pages/ExamQuestionUploadPage').then((module) => ({
    default: module.ExamQuestionUploadPage
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
  },
  {
    path: PRIVATE_ENDPOINTS.COURSE_MANAGEMENT,
    element: <CourseManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.COURSE_CREATE,
    element: <CourseCreatePage />
  },
  {
    path: PRIVATE_ENDPOINTS.SUBJECT_MANAGEMENT,
    element: <SubjectManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.SUBJECT_CREATE,
    element: <SubjectCreatePage />
  },
  {
    path: PRIVATE_ENDPOINTS.STUDENT_MANAGEMENT,
    element: <StudentManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.STUDENT_DETAIL,
    element: <StudentDetailPage />
  },
  {
    path: PRIVATE_ENDPOINTS.CLASS_MANAGEMENT,
    element: <ClassManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_CREATE,
    element: <ClassCreatePage />
  },
  {
    path: PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_EDIT,
    element: <ClassEditPage />
  },
  {
    path: PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_DETAIL,
    element: <ClassDetailPage />
  },
  {
    path: PRIVATE_ENDPOINTS.STUDENT_CLASS_ENROLLMENT,
    element: <StudentClassEnrollmentPage />
  },
  {
    path: PRIVATE_ENDPOINTS.EXAM_MANAGEMENT,
    element: <ExamManagementPage />
  },
  {
    path: PRIVATE_ENDPOINTS.EXAM_CREATE,
    element: <ExamCreatePage />
  },
  {
    path: PRIVATE_ENDPOINTS.EXAM_DETAIL,
    element: <ExamDetailPage />
  },
  {
    path: PRIVATE_ENDPOINTS.EXAM_QUESTION_UPLOAD,
    element: <ExamQuestionUploadPage />
  }
];
