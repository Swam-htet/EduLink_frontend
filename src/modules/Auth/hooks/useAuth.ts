import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { AuthService } from '@/modules/Auth/services/auth.service';
import {
  clearCredentials,
  selectCurrentUser,
  selectIsAuthenticated
} from '@/modules/Auth/store/auth.slice';

import { ErrorPayload } from '@/shared/providers/react-query/ReactQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      dispatch(clearCredentials());
      toast.success('Logged out successfully');
      navigate(PUBLIC_ENDPOINTS.LOGIN);
    },
    onError: (error) => {
      toast.error('Failed to logout');
      toast.error((error.response?.data as ErrorPayload).message);
    }
  });

  return {
    user,
    isAuthenticated,
    logout: logoutMutation.mutateAsync,
    isLoading: logoutMutation.isPending
  };
};
