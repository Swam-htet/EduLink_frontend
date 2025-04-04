import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { AuthService } from '@/modules/Admin/Auth/services/auth.service';
import {
  clearCredentials,
  selectCurrentAdminUser,
  selectIsAdminAuthenticated
} from '@/modules/Admin/Auth/store/auth.slice';

import { ErrorPayload } from '@/shared/providers/react-query/ReactQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAdminAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminUser = useSelector(selectCurrentAdminUser);
  const isAdminAuthenticated = useSelector(selectIsAdminAuthenticated);

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      dispatch(clearCredentials());
      toast.success('Logged out successfully');
      navigate(PUBLIC_ENDPOINTS.ADMIN_LOGIN);
    },
    onError: (error) => {
      toast.error('Failed to logout');
      toast.error((error.response?.data as ErrorPayload).message);
    }
  });

  return {
    adminUser,
    isAdminAuthenticated,
    logout: logoutMutation.mutateAsync,
    isLoading: logoutMutation.isPending
  };
};
