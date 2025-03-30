import { ErrorPage, LoadingPage } from '@/shared/components/pages';

import { PrivateRoute } from '@/components/PrivateRoute';
import { privateRoutes } from '@/ecosystem/Routes/PrivateRoutes';
import { publicRoutes } from '@/ecosystem/Routes/PublicRoutes';
import { AdminLayout } from '@/shared/components/layouts/AdminLayout/AdminLayout';
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
      <Route element={<PrivateRoute />} errorElement={<ErrorPage />}>
        <Route element={<AdminLayout />}>
          {privateRoutes.map((route) => (
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
