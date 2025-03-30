import CustomForm from '@/components/common/CustomForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { StudentRegistrationFormData } from '../../schemas/student.schema';
import { studentRegistrationSchema } from '../../schemas/student.schema';

interface StudentRegistrationFormProps {
  onSubmit: (data: StudentRegistrationFormData) => void;
  isPending: boolean;
}

export const StudentRegistrationForm = ({ onSubmit, isPending }: StudentRegistrationFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formMethods = useForm<StudentRegistrationFormData>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      phone: '',
      address: '',
      date_of_birth: '',
      gender: undefined,
      nrc: '',
      guardian_name: '',
      guardian_phone: '',
      guardian_relationship: ''
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      formMethods.setValue('profile_photo', file);
    }
  };

  const handleFormSubmit = (data: StudentRegistrationFormData) => {
    onSubmit(data);
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={handleFormSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
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

        <CustomForm.Password
          field={{
            name: 'password',
            label: 'Password',
            placeholder: 'Enter password'
          }}
        />

        <CustomForm.Password
          field={{
            name: 'confirm_password',
            label: 'Confirm Password',
            placeholder: 'Confirm your password'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'gender',
            label: 'Gender',
            placeholder: 'Select gender',
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' }
            ]
          }}
        />

        <CustomForm.Input
          field={{
            name: 'date_of_birth',
            label: 'Date of Birth',
            placeholder: 'YYYY-MM-DD',
            type: 'date'
          }}
        />
      </div>

      <CustomForm.Input
        field={{
          name: 'nrc',
          label: 'NRC (Optional)',
          placeholder: 'Enter NRC number'
        }}
      />

      <CustomForm.Textarea
        field={{
          name: 'address',
          label: 'Address',
          placeholder: 'Enter your address'
        }}
      />

      {/* Guardian Information */}
      <div className="space-y-4 rounded-md border p-4">
        <h3 className="text-lg font-medium">Guardian Information</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <CustomForm.Input
            field={{
              name: 'guardian_name',
              label: 'Guardian Name',
              placeholder: 'Enter guardian name'
            }}
          />

          <CustomForm.Input
            field={{
              name: 'guardian_phone',
              label: 'Guardian Phone',
              placeholder: 'Enter guardian phone'
            }}
          />

          <CustomForm.Input
            field={{
              name: 'guardian_relationship',
              label: 'Relationship',
              placeholder: 'e.g. Parent, Uncle, etc.'
            }}
          />
        </div>
      </div>

      {/* Profile Photo Upload */}
      <div className="space-y-2">
        <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Profile Photo (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
        />
        {selectedFile && (
          <p className="text-muted-foreground text-xs">Selected: {selectedFile.name}</p>
        )}
      </div>

      <CustomForm.Button type="submit" className="w-full" state={isPending ? 'loading' : 'default'}>
        {isPending ? 'Registering...' : 'Register'}
      </CustomForm.Button>
    </CustomForm>
  );
};
