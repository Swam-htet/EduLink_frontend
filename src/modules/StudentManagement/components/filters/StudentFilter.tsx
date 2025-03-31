import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { StudentFilterParams } from '@/modules/StudentManagement/types/studentManagement.types';
import { StudentStatus } from '@/modules/StudentRegistration/types/student.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const filterSchema = z.object({
  student_id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional().or(z.string().length(0)),
  phone: z.string().optional(),
  nrc: z.string().optional(),
  status: z.nativeEnum(StudentStatus).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  guardian_name: z.string().optional(),
  guardian_phone: z.string().optional(),
  date_of_birth: z
    .object({
      start: z.string().optional(),
      end: z.string().optional()
    })
    .optional(),
  enrollment_date: z
    .object({
      start: z.string().optional(),
      end: z.string().optional()
    })
    .optional(),
  per_page: z.number().optional(),
  sort_by: z
    .enum([
      'student_id',
      'first_name',
      'last_name',
      'email',
      'enrollment_date',
      'status',
      'created_at',
      'updated_at'
    ])
    .optional(),
  sort_direction: z.enum(['asc', 'desc']).optional()
});

interface StudentFilterProps {
  filters: StudentFilterParams;
  onFilterChange: (filters: StudentFilterParams) => void;
}

export const StudentFilter = ({ filters, onFilterChange }: StudentFilterProps) => {
  const formMethods = useForm<StudentFilterParams>({
    resolver: zodResolver(filterSchema),
    defaultValues: filters
  });

  const onSubmit = (data: StudentFilterParams) => {
    onFilterChange(data);
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <CustomForm.Input
          field={{
            name: 'student_id',
            label: 'Student ID',
            placeholder: 'Search by student ID'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'name',
            label: 'Name',
            placeholder: 'Search by name'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'email',
            label: 'Email',
            placeholder: 'Search by email',
            type: 'email'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'phone',
            label: 'Phone',
            placeholder: 'Search by phone'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'status',
            label: 'Status',
            placeholder: 'Select status',
            options: [
              { label: 'Pending', value: StudentStatus.PENDING },
              { label: 'Active', value: StudentStatus.ACTIVE },
              { label: 'Inactive', value: StudentStatus.INACTIVE },
              { label: 'Suspended', value: StudentStatus.SUSPENDED },
              { label: 'Rejected', value: StudentStatus.REJECTED }
            ]
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
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            formMethods.reset();
            onFilterChange({
              per_page: 15,
              sort_by: 'created_at',
              sort_direction: 'desc'
            });
          }}
        >
          Reset
        </Button>
        <CustomForm.Button type="submit">Apply Filters</CustomForm.Button>
      </div>
    </CustomForm>
  );
};
