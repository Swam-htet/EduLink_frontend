import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { StudentFilterParams } from '@/modules/Admin/StudentManagement/schemas/studentManagement.schema';
import { studentFilterSchema } from '@/modules/Admin/StudentManagement/schemas/studentManagement.schema';
import {
  StudentSortBy,
  StudentStatus
} from '@/modules/Admin/StudentManagement/types/studentManagement.types';
import { SortDirection } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface StudentFilterProps {
  filters: StudentFilterParams;
  onFilterChange: (filters: StudentFilterParams) => void;
}

export const StudentFilter = ({ filters, onFilterChange }: StudentFilterProps) => {
  const formMethods = useForm<StudentFilterParams>({
    resolver: zodResolver(studentFilterSchema),
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
              { label: 'Pending', value: StudentStatus.Pending },
              { label: 'Active', value: StudentStatus.Active },
              { label: 'Inactive', value: StudentStatus.Inactive },
              { label: 'Suspended', value: StudentStatus.Suspended },
              { label: 'Rejected', value: StudentStatus.Rejected }
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

        <CustomForm.DatePicker
          field={{
            name: 'date_of_birth.start',
            label: 'Start Date of Birth',
            placeholder: 'Select start date of birth'
          }}
        />

        <CustomForm.DatePicker
          field={{
            name: 'date_of_birth.end',
            label: 'End Date of Birth',
            placeholder: 'Select end date of birth'
          }}
        />

        <CustomForm.DatePicker
          field={{
            name: 'enrollment_date.start',
            label: 'Start Enrollment Date',
            placeholder: 'Select start enrollment date'
          }}
        />

        <CustomForm.DatePicker
          field={{
            name: 'enrollment_date.end',
            label: 'End Enrollment Date',
            placeholder: 'Select end enrollment date'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_by',
            label: 'Sort By',
            placeholder: 'Select sort by',
            options: [
              { label: 'Student ID', value: StudentSortBy.StudentId },
              { label: 'Name', value: StudentSortBy.Name },
              { label: 'Email', value: StudentSortBy.Email },
              { label: 'Phone', value: StudentSortBy.Phone },
              { label: 'Status', value: StudentSortBy.Status },
              { label: 'Gender', value: StudentSortBy.Gender },
              { label: 'Date of Birth', value: StudentSortBy.DateOfBirth },
              { label: 'Enrollment Date', value: StudentSortBy.EnrollmentDate },
              { label: 'Created At', value: StudentSortBy.CreatedAt },
              { label: 'Updated At', value: StudentSortBy.UpdatedAt }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_direction',
            label: 'Sort Direction',
            placeholder: 'Select sort direction',
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
            formMethods.reset();
            onFilterChange({
              per_page: 15,
              sort_by: StudentSortBy.CreatedAt,
              sort_direction: SortDirection.Desc
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
