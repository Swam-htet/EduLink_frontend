import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import {
  staffFilterSchema,
  type StaffFilterFormValues
} from '@/modules/Admin/StaffManagement/schemas/staff.schema';
import {
  StaffGender,
  StaffRole,
  StaffSortBy,
  StaffStatus
} from '@/modules/Admin/StaffManagement/types/staffManagement.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface StaffFilterProps {
  filters: StaffFilterFormValues;
  onFilterChange: (filters: StaffFilterFormValues) => void;
}

export const StaffFilter = ({ filters, onFilterChange }: StaffFilterProps) => {
  const formMethods = useForm<StaffFilterFormValues>({
    resolver: zodResolver(staffFilterSchema),
    defaultValues: filters
  });

  const onSubmit = (data: StaffFilterFormValues) => {
    onFilterChange(data);
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
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

        <CustomForm.Input
          field={{
            name: 'nrc',
            label: 'NRC',
            placeholder: 'Search by NRC'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'status',
            label: 'Status',
            placeholder: 'Select status',
            options: [
              { label: 'Active', value: StaffStatus.Active },
              { label: 'Inactive', value: StaffStatus.Inactive }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'role',
            label: 'Role',
            placeholder: 'Select role',
            options: [
              { label: 'Teacher', value: StaffRole.Teacher },
              { label: 'Admin', value: StaffRole.Admin },
              { label: 'Staff', value: StaffRole.Staff }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'gender',
            label: 'Gender',
            placeholder: 'Select gender',
            options: [
              { label: 'Male', value: StaffGender.Male },
              { label: 'Female', value: StaffGender.Female },
              { label: 'Other', value: StaffGender.Other }
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
            name: 'joined_date.start',
            label: 'Start Joined Date',
            placeholder: 'Select start joined date'
          }}
        />

        <CustomForm.DatePicker
          field={{
            name: 'joined_date.end',
            label: 'End Joined Date',
            placeholder: 'Select end joined date'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_by',
            label: 'Sort By',
            placeholder: 'Select sort by',
            options: [
              { label: 'Name', value: StaffSortBy.Name },
              { label: 'Email', value: StaffSortBy.Email },
              { label: 'Role', value: StaffSortBy.Role },
              { label: 'Joined Date', value: StaffSortBy.JoinedDate },
              { label: 'Status', value: StaffSortBy.Status },
              { label: 'Created At', value: StaffSortBy.CreatedAt },
              { label: 'Updated At', value: StaffSortBy.UpdatedAt }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_direction',
            label: 'Sort Direction',
            placeholder: 'Select sort direction',
            options: [
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' }
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
              sort_by: StaffSortBy.CreatedAt,
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
