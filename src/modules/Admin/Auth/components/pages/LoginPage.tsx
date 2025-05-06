import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { LoginForm } from '@/modules/Admin/Auth/components/forms/LoginForm';
import { LoginFormData } from '@/modules/Admin/Auth/schemas/auth.schema';
import { AuthService } from '@/modules/Admin/Auth/services/auth.service';
import { setCredentials } from '@/modules/Admin/Auth/store/auth.slice';
import { ErrorPayload } from '@/providers/react-query/ReactQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          adminUser: data.data.staff,
          token: data.data.token
        })
      );
      toast.success(data.message);
      navigate(ADMIN_PRIVATE_ENDPOINTS.PROFILE);
    },
    onError: (error) => {
      toast.error((error.response?.data as ErrorPayload).message);
    }
  });

  const handleSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync({
      email: data.email,
      password: data.password
    });
  };

  return (
    <div className="from-primary-50 to-primary-100 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome back</h1>
          <p className="mt-2 text-lg text-gray-600">Sign in to your admin account</p>
          <LoginForm onSubmit={handleSubmit} loading={loginMutation.isPending} />
        </div>

        {/* <div className="flex items-center justify-between text-sm">
          <Button
            variant="link"
            className="text-primary-600 hover:text-primary-500"
            // onClick={() => navigate(PUBLIC_ENDPOINTS.FORGOT_PASSWORD)}
          >
            Forgot your password?
          </Button>
        </div> */}
      </div>
    </div>
  );
};
