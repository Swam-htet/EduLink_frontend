import { Button } from '@/components/ui/button';
import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { LoginForm } from '@/modules/Auth/components/forms/LoginForm';
import { useAuth } from '@/modules/Auth/hooks/useAuth';
import { LoginFormData } from '@/modules/Auth/schemas/auth.schema';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="from-primary-50 to-primary-100 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome back</h1>
          <p className="mt-2 text-lg text-gray-600">Sign in to your account</p>
        </div>

        <LoginForm onSubmit={handleSubmit} />

        <div className="flex items-center justify-between text-sm">
          <Button
            variant="link"
            className="text-primary-600 hover:text-primary-500"
            onClick={() => navigate(PUBLIC_ENDPOINTS.FORGOT_PASSWORD)}
          >
            Forgot your password?
          </Button>
          <Button
            variant="link"
            className="text-primary-600 hover:text-primary-500"
            onClick={() => navigate(PUBLIC_ENDPOINTS.REGISTER)}
          >
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
};
