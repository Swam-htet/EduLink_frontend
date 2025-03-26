import { PrivateRoute } from '@/components/PrivateRoute';
import { ErrorPage, LoadingPage } from '@/shared/components/pages';
import { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { privateRoutes } from './PrivateRoutes';
import { publicRoutes } from './PublicRoutes';

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

      {/* Private Routes */}
      <Route element={<PrivateRoute />} errorElement={<ErrorPage />}>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
            errorElement={<ErrorPage />}
          />
        ))}
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
