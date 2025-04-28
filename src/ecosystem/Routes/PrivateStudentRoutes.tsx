import { RouteObject } from 'react-router-dom';

import { STUDENT_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { lazy } from 'react';

const ProfilePage = lazy(() =>
  import('@/modules/Student/Profile/components/pages/ProfilePage').then((module) => ({
    default: module.ProfilePage
  }))
);

const ClassListPage = lazy(() =>
  import('@/modules/Student/Class/components/pages/ClassListPage').then((module) => ({
    default: module.ClassListPage
  }))
);

const ExamFormPage = lazy(() =>
  import('@/modules/Student/Exam/components/pages/ExamFormPage').then((module) => ({
    default: module.ExamFormPage
  }))
);

const ExamListPage = lazy(() =>
  import('@/modules/Student/Exam/components/pages/ExamListPage').then((module) => ({
    default: module.ExamListPage
  }))
);

const ExamResultPage = lazy(() =>
  import('@/modules/Student/Exam/components/pages/ExamResultPage').then((module) => ({
    default: module.ExamResultPage
  }))
);

export const privateStudentRoutes: RouteObject[] = [
  {
    path: STUDENT_PRIVATE_ENDPOINTS.CLASS_LIST,
    element: <ClassListPage />
  },
  {
    path: STUDENT_PRIVATE_ENDPOINTS.EXAM_LIST,
    element: <ExamListPage />
  },
  {
    path: STUDENT_PRIVATE_ENDPOINTS.EXAM_RESULT_DETAIL,
    element: <ExamResultPage />
  },
  {
    path: STUDENT_PRIVATE_ENDPOINTS.EXAM_FORM,
    element: <ExamFormPage />
  },
  {
    path: STUDENT_PRIVATE_ENDPOINTS.PROFILE,
    element: <ProfilePage />
  }
];
