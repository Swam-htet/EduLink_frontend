import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { AuthService } from '@/modules/Admin/Auth/services/auth.service';
import {
  clearCredentials,
  selectCurrentStudentUser,
  selectIsStudentAuthenticated
} from '@/modules/Student/Auth/store/auth.slice';

import { ErrorPayload } from '@/shared/providers/react-query/ReactQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useStudentAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentUser = useSelector(selectCurrentStudentUser);
  const isStudentAuthenticated = useSelector(selectIsStudentAuthenticated);

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      dispatch(clearCredentials());
      toast.success('Logged out successfully');
      navigate(PUBLIC_ENDPOINTS.STUDENT_LOGIN);
    },
    onError: (error) => {
      toast.error('Failed to logout');
      toast.error((error.response?.data as ErrorPayload).message);
    }
  });

  return {
    studentUser,
    isStudentAuthenticated,
    logout: logoutMutation.mutateAsync,
    isLoading: logoutMutation.isPending
  };
};
