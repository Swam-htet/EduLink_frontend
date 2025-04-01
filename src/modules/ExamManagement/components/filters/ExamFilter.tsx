import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { ExamFilterParams } from '@/modules/ExamManagement/types/exam.types';
import { ExamStatus } from '@/modules/ExamManagement/types/exam.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const examFilterSchema = z.object({
  title: z.string().optional(),
  class_id: z.number().optional(),
  subject_id: z.number().optional(),
  status: z.nativeEnum(ExamStatus).optional(),
  date_range: z
    .object({
      start: z.string(),
      end: z.string()
    })
    .optional(),
  per_page: z.number().min(1).max(100).optional(),
  sort_by: z.enum(['title', 'start_date', 'created_at']).optional(),
  sort_direction: z.enum(['asc', 'desc']).optional(),
  current_page: z.number().optional()
});

interface ExamFilterProps {
  filters: ExamFilterParams;
  onFilterChange: (filters: ExamFilterParams) => void;
}

export const ExamFilter = ({ filters, onFilterChange }: ExamFilterProps) => {
  const formMethods = useForm<ExamFilterParams>({
    resolver: zodResolver(examFilterSchema),
    defaultValues: filters
  });

  const onSubmit = (data: ExamFilterParams) => {
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

        <CustomForm.Select
          field={{
            name: 'status',
            label: 'Status',
            placeholder: 'Select status',
            options: [
              { label: 'Draft', value: ExamStatus.DRAFT },
              { label: 'Published', value: ExamStatus.PUBLISHED },
              { label: 'Ongoing', value: ExamStatus.ONGOING },
              { label: 'Completed', value: ExamStatus.COMPLETED },
              { label: 'Cancelled', value: ExamStatus.CANCELLED }
            ]
          }}
        />

        <CustomForm.DateRangePicker
          field={{
            name: 'date_range',
            label: 'Exam Date Range'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_by',
            label: 'Sort By',
            placeholder: 'Select sort field',
            options: [
              { label: 'Title', value: 'title' },
              { label: 'Start Date', value: 'start_date' },
              { label: 'Created At', value: 'created_at' }
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
