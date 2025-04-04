import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { selectIsAdminAuthenticated } from '@/modules/Admin/Auth/store/auth.slice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminPrivateRoute = () => {
  const isAdminAuthenticated = useSelector(selectIsAdminAuthenticated);

  if (isAdminAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to={PUBLIC_ENDPOINTS.ADMIN_LOGIN} replace />;
};
