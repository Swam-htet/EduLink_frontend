import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import {
  enrollmentFilterSchema,
  type EnrollmentFilterFormData
} from '@/modules/Admin/StudentClassEnrollment/schemas/enrollment.schema';
import {
  EnrollmentSortBy,
  EnrollmentStatus
} from '@/modules/Admin/StudentClassEnrollment/types/enrollment.types';
import { SortDirection } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface EnrollmentFilterProps {
  filters: EnrollmentFilterFormData;
  onFilterChange: (filters: EnrollmentFilterFormData) => void;
}

export const EnrollmentFilter = ({ filters, onFilterChange }: EnrollmentFilterProps) => {
  const form = useForm<EnrollmentFilterFormData>({
    resolver: zodResolver(enrollmentFilterSchema),
    defaultValues: filters
  });

  const onSubmit = (data: EnrollmentFilterFormData) => {
    onFilterChange(data);
  };

  return (
    <CustomForm formMethods={form} onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-3">
        <CustomForm.Select
          field={{
            name: 'status',
            label: 'Status',
            placeholder: 'Select Status',
            options: [
              { label: 'Enrolled', value: EnrollmentStatus.ENROLLED },
              { label: 'Completed', value: EnrollmentStatus.COMPLETED },
              { label: 'Failed', value: EnrollmentStatus.FAILED }
            ]
          }}
        />
        <CustomForm.DatePicker
          field={{
            name: 'enrolled_at.start',
            label: 'Start Enrolled Date',
            placeholder: 'Select Start Enrolled Date'
          }}
        />
        <CustomForm.DatePicker
          field={{
            name: 'enrolled_at.end',
            label: 'End Enrolled Date',
            placeholder: 'Select End Enrolled Date'
          }}
        />
        <CustomForm.Select
          field={{
            name: 'sort_by',
            label: 'Sort By',
            placeholder: 'Select Sort By',
            options: [
              { label: 'Student ID', value: EnrollmentSortBy.STUDENT_ID },
              { label: 'Class ID', value: EnrollmentSortBy.CLASS_ID },
              { label: 'Enrolled At', value: EnrollmentSortBy.ENROLLED_AT },
              { label: 'Status', value: EnrollmentSortBy.STATUS },
              { label: 'Created At', value: EnrollmentSortBy.CREATED_AT },
              { label: 'Updated At', value: EnrollmentSortBy.UPDATED_AT }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_direction',
            label: 'Sort Direction',
            placeholder: 'Select Sort Direction',
            options: [
              { label: 'Ascending', value: SortDirection.Asc },
              { label: 'Descending', value: SortDirection.Desc }
            ]
          }}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
            onFilterChange({});
          }}
        >
          Reset
        </Button>
        <Button type="submit">Apply Filters</Button>
      </div>
    </CustomForm>
  );
};
