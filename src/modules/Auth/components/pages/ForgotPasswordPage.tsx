import { Button } from '@/components/ui/button';
import { PUBLIC_ENDPOINTS } from '@/ecosystem/PageEndpoints/Public';
import { ForgotPasswordForm } from '@/modules/Auth/components/forms/ForgotPasswordForm';
import { ForgotPasswordFormData } from '@/modules/Auth/schemas/auth.schema';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log('Reset password for:', data.email);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="from-primary-50 to-primary-100 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Reset password</h1>
          <p className="mt-2 text-lg text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        <ForgotPasswordForm onSubmit={handleSubmit} />

        <div className="text-center text-sm text-gray-600">
          Remember your password?{' '}
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
