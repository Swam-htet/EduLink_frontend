import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { AuthService } from '@/modules/Auth/services/auth.service';
import {
  clearCredentials,
  selectCurrentUser,
  selectIsAuthenticated,
  setCredentials
} from '@/modules/Auth/store/auth.slice';

import { AuthResponse, LoginRequest, RegisterRequest } from '@/modules/Auth/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const loginMutation = useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.accessToken
        })
      );
    }
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: AuthService.register,
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.accessToken
        })
      );
    }
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      dispatch(clearCredentials());
      navigate(PUBLIC_ENDPOINTS.LOGIN);
    }
  });

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending
  };
};
