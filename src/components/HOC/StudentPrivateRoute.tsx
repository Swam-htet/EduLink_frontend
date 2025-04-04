import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { selectIsStudentAuthenticated } from '@/modules/Student/Auth/store/auth.slice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const StudentPrivateRoute = () => {
  const isStudentAuthenticated = useSelector(selectIsStudentAuthenticated);

  if (isStudentAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to={PUBLIC_ENDPOINTS.STUDENT_LOGIN} replace />;
};
