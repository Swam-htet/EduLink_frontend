import CustomForm from '@/components/common/CustomForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { StaffCreateFormData } from '../../schemas/staff.schema';
import { staffCreateSchema } from '../../schemas/staff.schema';

interface StaffCreateFormProps {
  onSubmit: (data: StaffCreateFormData) => void;
  loading?: boolean;
}

export const StaffCreateForm = ({ onSubmit, loading }: StaffCreateFormProps) => {
  const formMethods = useForm<StaffCreateFormData>({
    resolver: zodResolver(staffCreateSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      nrc: '',
      role: '',
      gender: '',
      // todo need to fix this
      date_of_birth: new Date(),
      address: ''
    }
  });

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CustomForm.Input
          field={{
            name: 'first_name',
            label: 'First Name',
            placeholder: 'Enter first name'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'last_name',
            label: 'Last Name',
            placeholder: 'Enter last name'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'email',
            label: 'Email',
            placeholder: 'Enter email address',
            type: 'email'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'phone',
            label: 'Phone Number',
            placeholder: 'Enter phone number'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'role',
            label: 'Role',
            placeholder: 'Select role',
            options: [
              { label: 'Teacher', value: 'teacher' },
              { label: 'Admin', value: 'admin' },
              { label: 'Staff', value: 'staff' }
            ]
          }}
        />

        <CustomForm.Input
          field={{
            name: 'nrc',
            label: 'NRC',
            placeholder: 'Enter NRC number'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'gender',
            label: 'Gender',
            placeholder: 'Select gender',
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' }
            ]
          }}
        />

        <CustomForm.DatePicker
          field={{
            name: 'date_of_birth',
            label: 'Date of Birth',
            placeholder: 'Select date of birth'
          }}
        />
      </div>

      <CustomForm.Input
        field={{
          name: 'address',
          label: 'Address',
          placeholder: 'Enter full address'
        }}
      />

      <CustomForm.Button type="submit" className="w-full" state={loading ? 'loading' : 'default'}>
        {loading ? 'Creating Staff...' : 'Create Staff'}
      </CustomForm.Button>
    </CustomForm>
  );
};

export default StaffCreateForm;
