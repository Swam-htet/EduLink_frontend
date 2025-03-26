import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { selectIsAuthenticated } from '@/modules/Auth/store/auth.slice';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={PUBLIC_ENDPOINTS.LOGIN} replace />;
};
