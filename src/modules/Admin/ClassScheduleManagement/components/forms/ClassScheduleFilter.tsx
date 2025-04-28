import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const classScheduleFilterSchema = z.object({
  class_id: z.string().optional().nullable()
});

export type ClassScheduleFilterFormValues = z.infer<typeof classScheduleFilterSchema>;

interface ClassScheduleFilterProps {
  filters: ClassScheduleFilterFormValues;
  onFilterChange: (filters: ClassScheduleFilterFormValues) => void;
  classes: Array<{ id: number; title: string }>;
  onReset: () => void;
}

export const ClassScheduleFilter = ({
  filters,
  onFilterChange,
  classes,
  onReset
}: ClassScheduleFilterProps) => {
  const formMethods = useForm<ClassScheduleFilterFormValues>({
    resolver: zodResolver(classScheduleFilterSchema),
    defaultValues: filters
  });

  const onSubmit = (values: ClassScheduleFilterFormValues) => {
    onFilterChange(values);
  };

  const handleReset = () => {
    formMethods.reset();
    onReset();
    onFilterChange({});
  };

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CustomForm.Select
          field={{
            name: 'class_id',
            label: 'Class',
            placeholder: 'Select class',
            options: classes.map((classItem) => ({
              value: classItem.id.toString(),
              label: classItem.title
            }))
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
