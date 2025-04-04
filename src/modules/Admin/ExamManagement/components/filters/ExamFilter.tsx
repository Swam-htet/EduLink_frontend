import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import {
  ExamFilterFormData,
  examFilterSchema
} from '@/modules/Admin/ExamManagement/schemas/exam.schema';
import { ExamSortBy, ExamStatus } from '@/modules/Admin/ExamManagement/types/exam.types';
import { SortDirection } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface ExamFilterProps {
  filters: ExamFilterFormData;
  onFilterChange: (filters: ExamFilterFormData) => void;
}

export const ExamFilter = ({ filters, onFilterChange }: ExamFilterProps) => {
  const formMethods = useForm<ExamFilterFormData>({
    resolver: zodResolver(examFilterSchema),
    defaultValues: filters
  });

  const onSubmit = (data: ExamFilterFormData) => {
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

        <CustomForm.DatePicker
          field={{
            name: 'exam_date',
            label: 'Exam Date'
          }}
        />

        <CustomForm.TimePicker
          field={{
            name: 'start_time',
            label: 'Start Time'
          }}
        />

        <CustomForm.TimePicker
          field={{
            name: 'end_time',
            label: 'End Time'
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
              sort_by: ExamSortBy.CREATED_AT,
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
