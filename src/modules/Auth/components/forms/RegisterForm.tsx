import CustomForm from '@/components/common/CustomForm';
import { RegisterFormData, registerSchema } from '@/modules/Auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  loading?: boolean;
}

export const RegisterForm = ({ onSubmit, loading }: RegisterFormProps) => {
  const formMethods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-6">
      <CustomForm.Input
        field={{
          name: 'name',
          label: 'Full Name',
          placeholder: 'Enter your full name'
        }}
      />
      <CustomForm.Input
        field={{
          name: 'email',
          label: 'Email',
          placeholder: 'Enter your email',
          type: 'email'
        }}
      />
      <CustomForm.Password
        field={{
          name: 'password',
          label: 'Password',
          placeholder: 'Create a password'
        }}
      />
      <CustomForm.Button type="submit" className="w-full" state={loading ? 'loading' : 'default'}>
        {loading ? 'Creating account...' : 'Create account'}
      </CustomForm.Button>
    </CustomForm>
  );
};
