import CustomForm from '@/components/common/CustomForm';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/modules/Auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => void;
  loading?: boolean;
}

export const ForgotPasswordForm = ({ onSubmit, loading }: ForgotPasswordFormProps) => {
  const formMethods = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-6">
      <CustomForm.Input
        field={{
          name: 'email',
          label: 'Email address',
          placeholder: 'Enter your email',
          type: 'email'
        }}
      />
      <CustomForm.Button type="submit" className="w-full" state={loading ? 'loading' : 'default'}>
        {loading ? 'Sending instructions...' : 'Send reset instructions'}
      </CustomForm.Button>
    </CustomForm>
  );
};
