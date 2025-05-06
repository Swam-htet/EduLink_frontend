import CustomForm from '@/components/common/CustomForm';
import { LoginFormData, loginSchema } from '@/modules/Admin/Auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
}

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const formMethods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-6">
      <CustomForm.Input
        field={{
          name: 'email',
          label: 'Email',
          placeholder: 'Enter your email'
        }}
      />

      <CustomForm.Password
        field={{
          name: 'password',
          label: 'Password',
          placeholder: 'Enter your password'
        }}
      />
      <CustomForm.Button type="submit" className="w-full" state={loading ? 'loading' : 'default'}>
        {loading ? 'Signing in...' : 'Sign in'}
      </CustomForm.Button>
    </CustomForm>
  );
};
