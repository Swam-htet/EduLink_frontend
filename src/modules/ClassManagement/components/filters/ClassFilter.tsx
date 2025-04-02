import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { ClassFilterFormValues } from '@/modules/ClassManagement/schemas/class.schema';
import { classFilterSchema } from '@/modules/ClassManagement/schemas/class.schema';
import { ClassStatus } from '@/modules/ClassManagement/types/class.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface ClassFilterProps {
  filters: ClassFilterFormValues;
  onFilterChange: (filters: ClassFilterFormValues) => void;
  courses: Array<{ id: number; title: string }>;
}

export const ClassFilter = ({ filters, onFilterChange, courses }: ClassFilterProps) => {
  const formMethods = useForm<ClassFilterFormValues>({
    resolver: zodResolver(classFilterSchema),
    defaultValues: filters
  });

  const onSubmit = (values: ClassFilterFormValues) => {
    onFilterChange(values);
  };

  const handleReset = () => {
    formMethods.reset();
    onFilterChange({});
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CustomForm.Input
          field={{
            name: 'name',
            label: 'Class Name',
            placeholder: 'Search by name...'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'code',
            label: 'Class Code',
            placeholder: 'Search by code...'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'status',
            label: 'Status',
            placeholder: 'Select status',
            options: [
              { value: ClassStatus.Scheduled, label: 'Scheduled' },
              { value: ClassStatus.Ongoing, label: 'Ongoing' },
              { value: ClassStatus.Completed, label: 'Completed' },
              { value: ClassStatus.Cancelled, label: 'Cancelled' }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'course_id',
            label: 'Course',
            placeholder: 'Select course',
            options: courses.map((course) => ({ value: course.id.toString(), label: course.title }))
          }}
        />

        <CustomForm.DatePicker
          field={{
            name: 'date_range.start',
            label: 'Start Date',
            placeholder: 'Select start date'
          }}
        />
        <CustomForm.DatePicker
          field={{
            name: 'date_range.end',
            label: 'End Date',
            placeholder: 'Select end date'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_by',
            label: 'Sort By',
            placeholder: 'Select sort field',
            options: [
              { value: 'name', label: 'Name' },
              { value: 'code', label: 'Code' },
              { value: 'status', label: 'Status' },
              { value: 'created_at', label: 'Created At' }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_order',
            label: 'Sort Order',
            placeholder: 'Select sort order',
            options: [
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' }
            ]
          }}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit">Apply Filters</Button>
      </div>
    </CustomForm>
  );
};
