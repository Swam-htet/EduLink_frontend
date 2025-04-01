import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import { courseFilterSchema } from '@/modules/CourseManagement/schemas/course.schema';
import type { CourseFilterParams } from '@/modules/CourseManagement/types/course.types';
import { CourseSortBy } from '@/modules/CourseManagement/types/course.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface CourseFilterProps {
  filters: CourseFilterParams;
  onFilterChange: (filters: CourseFilterParams) => void;
}

export const CourseFilter = ({ filters, onFilterChange }: CourseFilterProps) => {
  const formMethods = useForm<CourseFilterParams>({
    resolver: zodResolver(courseFilterSchema),
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
            name: 'sort_by',
            label: 'Sort by',
            options: [
              { label: 'Title', value: CourseSortBy.TITLE },
              { label: 'Code', value: CourseSortBy.CODE },
              { label: 'Created at', value: CourseSortBy.CREATED_AT },
              { label: 'Updated at', value: CourseSortBy.UPDATED_AT }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_direction',
            label: 'Sort direction',
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
