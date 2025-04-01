import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import { Course } from '@/modules/CourseManagement/types/course.types';
import {
  SubjectFilterParams,
  subjectFilterSchema
} from '@/modules/SubjectManagement/schemas/subject.schema';
import { SubjectSortBy } from '@/modules/SubjectManagement/types/subject.types';
import { SortDirection } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface SubjectFilterProps {
  filters: SubjectFilterParams;
  onFilterChange: (filters: SubjectFilterParams) => void;
  courses: Course[];
}

export const SubjectFilter = ({ filters, onFilterChange, courses }: SubjectFilterProps) => {
  const formMethods = useForm<SubjectFilterParams>({
    resolver: zodResolver(subjectFilterSchema),
    defaultValues: filters
  });

  const onSubmit = (data: SubjectFilterParams) => {
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
            name: 'course_id',
            label: 'Course',
            placeholder: 'Select course',
            options:
              courses?.map((course) => ({
                label: course.title,
                value: course.id.toString()
              })) || []
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_by',
            label: 'Sort by',
            placeholder: 'Select sort by',
            options: [
              { label: 'Title', value: SubjectSortBy.TITLE },
              { label: 'Code', value: SubjectSortBy.CODE },
              { label: 'Credits', value: SubjectSortBy.CREDITS },
              { label: 'Course', value: SubjectSortBy.COURSE_ID },
              { label: 'Created at', value: SubjectSortBy.CREATED_AT },
              { label: 'Updated at', value: SubjectSortBy.UPDATED_AT }
            ]
          }}
        />

        <CustomForm.Select
          field={{
            name: 'sort_direction',
            label: 'Sort direction',
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
