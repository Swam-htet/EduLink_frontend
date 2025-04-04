import { ErrorPage, LoadingPage } from '@/components/pages';

import { AdminPrivateRoute } from '@/components/AdminPrivateRoute';
import { AdminLayout } from '@/components/layouts/AdminLayout/AdminLayout';
import { StudentLayout } from '@/components/layouts/StudentLayout/StudentLayout';
import { StudentPrivateRoute } from '@/components/StudentPrivateRoute';
import { privateAdminRoutes } from '@/ecosystem/Routes/PrivateAdminRoutes';
import { privateStudentRoutes } from '@/ecosystem/Routes/PrivateStudentRoutes';
import { publicRoutes } from '@/ecosystem/Routes/PublicRoutes';
import { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
          errorElement={<ErrorPage />}
        />
      ))}

      {/* Private Routes with Admin Layout */}
      <Route element={<AdminPrivateRoute />} errorElement={<ErrorPage />}>
        <Route element={<AdminLayout />}>
          {privateAdminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
              errorElement={<ErrorPage />}
            />
          ))}
        </Route>
      </Route>

      <Route element={<StudentPrivateRoute />} errorElement={<ErrorPage />}>
        <Route element={<StudentLayout />}>
          {privateStudentRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
              errorElement={<ErrorPage />}
            />
          ))}
        </Route>
      </Route>
    </>
  )
);

export const Router = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
