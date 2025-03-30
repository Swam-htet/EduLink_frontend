import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import CourseManagementService from '@/modules/CourseManagement/services/CourseManagement.service';
import type { SubjectFilterParams } from '@/modules/SubjectManagement/types/subject.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const filterSchema = z.object({
  course_id: z.string().optional(),
  title: z.string().optional(),
  code: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  credits: z.string().optional(),
  sort_by: z.enum(['title', 'code', 'credits', 'course_id', 'created_at', 'updated_at']).optional(),
  sort_direction: z.enum(['asc', 'desc']).optional()
});

interface SubjectFilterProps {
  filters: SubjectFilterParams;
  onFilterChange: (filters: SubjectFilterParams) => void;
}

export const SubjectFilter = ({ filters, onFilterChange }: SubjectFilterProps) => {
  const formMethods = useForm<SubjectFilterParams>({
    resolver: zodResolver(filterSchema),
    defaultValues: filters
  });

  const { data: coursesData } = useQuery({
    queryKey: ['courses'],
    queryFn: () => CourseManagementService.getCourses()
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
              coursesData?.data.map((course) => ({
                label: course.title,
                value: course.id.toString()
              })) || []
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
