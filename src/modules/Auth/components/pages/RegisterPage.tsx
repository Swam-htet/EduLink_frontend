import { Button } from '@/components/ui/button';
import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { RegisterForm } from '@/modules/Auth/components/forms/RegisterForm';

import { useAuth } from '@/modules/Auth/hooks/useAuth';
import { RegisterFormData } from '@/modules/Auth/schemas/auth.schema';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register({
        name: data.name,
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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Create account</h1>
          <p className="mt-2 text-lg text-gray-600">Join us today</p>
        </div>

        <RegisterForm onSubmit={handleSubmit} />

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Button
            variant="link"
            className="text-primary-600 hover:text-primary-500"
            onClick={() => navigate(PUBLIC_ENDPOINTS.LOGIN)}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};
