import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { CourseFilterParams } from '@/modules/CourseManagement/types/course.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const filterSchema = z.object({
  title: z.string().optional(),
  code: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  sort_by: z.enum(['name', 'code', 'created_at', 'updated_at']).optional(),
  sort_direction: z.enum(['asc', 'desc']).optional()
});

interface CourseFilterProps {
  filters: CourseFilterParams;
  onFilterChange: (filters: CourseFilterParams) => void;
}

export const CourseFilter = ({ filters, onFilterChange }: CourseFilterProps) => {
  const formMethods = useForm<CourseFilterParams>({
    resolver: zodResolver(filterSchema),
    defaultValues: filters
  });

  const onSubmit = (data: CourseFilterParams) => {
    onFilterChange(data);
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <CustomForm.Input
          field={{
            name: 'title',
            label: 'Title',
            placeholder: 'Search by title'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'code',
            label: 'Code',
            placeholder: 'Search by code'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'status',
            label: 'Status',
            placeholder: 'Select status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' }
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
            onFilterChange({});
          }}
        >
          Reset
        </Button>
        <CustomForm.Button type="submit">Apply Filters</CustomForm.Button>
      </div>
    </CustomForm>
  );
};
