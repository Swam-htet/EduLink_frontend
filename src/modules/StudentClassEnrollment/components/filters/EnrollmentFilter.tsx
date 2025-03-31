import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { EnrollmentFilterParams } from '@/modules/StudentClassEnrollment/types/enrollment.types';
import { EnrollmentStatus } from '@/modules/StudentClassEnrollment/types/enrollment.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const enrollmentFilterSchema = z.object({
  student_id: z.number().optional(),
  class_id: z.number().optional(),
  status: z.nativeEnum(EnrollmentStatus).optional(),
  enrolled_at: z
    .object({
      start: z.string(),
      end: z.string()
    })
    .optional(),
  per_page: z.number().min(1).max(100).optional(),
  sort_by: z
    .enum(['student_id', 'class_id', 'enrolled_at', 'status', 'created_at', 'updated_at'])
    .optional(),
  sort_direction: z.enum(['asc', 'desc']).optional()
});

interface EnrollmentFilterProps {
  filters: EnrollmentFilterParams;
  onFilterChange: (filters: EnrollmentFilterParams) => void;
}

export const EnrollmentFilter = ({ filters, onFilterChange }: EnrollmentFilterProps) => {
  const formMethods = useForm<EnrollmentFilterParams>({
    resolver: zodResolver(enrollmentFilterSchema),
    defaultValues: filters
  });

  const onSubmit = (data: EnrollmentFilterParams) => {
    onFilterChange(data);
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <CustomForm.Select
          field={{
            name: 'status',
            label: 'Status',
            placeholder: 'Select status',
            options: [
              { label: 'Enrolled', value: EnrollmentStatus.ENROLLED },
              { label: 'Completed', value: EnrollmentStatus.COMPLETED },
              { label: 'Failed', value: EnrollmentStatus.FAILED }
            ]
          }}
        />
        <CustomForm.DateRangePicker
          field={{
            name: 'enrolled_at',
            label: 'Enrolled Date'
          }}
        />
        <CustomForm.Select
          field={{
            name: 'sort_by',
            label: 'Sort By',
            placeholder: 'Select sort field',
            options: [
              { label: 'Student ID', value: 'student_id' },
              { label: 'Class ID', value: 'class_id' },
              { label: 'Enrollment Date', value: 'enrolled_at' },
              { label: 'Status', value: 'status' },
              { label: 'Created At', value: 'created_at' },
              { label: 'Updated At', value: 'updated_at' }
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
