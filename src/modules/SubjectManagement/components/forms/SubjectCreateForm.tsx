import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import { Course } from '@/modules/CourseManagement/types/course.types';
import type { SubjectCreateFormData } from '@/modules/SubjectManagement/schemas/subject.schema';
import { subjectCreateSchema } from '@/modules/SubjectManagement/schemas/subject.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface SubjectCreateFormProps {
  onSubmit: (data: SubjectCreateFormData) => void;
  isPending: boolean;
  onCancel: () => void;
  courses: Course[];
}

export const SubjectCreateForm = ({
  onSubmit,
  isPending,
  onCancel,
  courses
}: SubjectCreateFormProps) => {
  const formMethods = useForm<SubjectCreateFormData>({
    resolver: zodResolver(subjectCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      credits: '',
      course_id: undefined
    }
  });

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <CustomForm.Input
          field={{
            name: 'title',
            label: 'Title',
            placeholder: 'Enter subject title'
          }}
        />

        <CustomForm.Select
          field={{
            name: 'course_id',
            label: 'Course',
            placeholder: 'Select course',
            options:
              courses.map((course) => ({
                label: course.title,
                value: course.id.toString()
              })) || []
          }}
        />

        <CustomForm.Input
          field={{
            name: 'credits',
            label: 'Credits',
            placeholder: 'Enter credits',
            type: 'number'
          }}
        />
      </div>

      <CustomForm.Textarea
        field={{
          name: 'description',
          label: 'Description',
          placeholder: 'Enter subject description'
        }}
      />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <CustomForm.Button type="submit" state={isPending ? 'loading' : 'default'}>
          {isPending ? 'Creating Subject...' : 'Create Subject'}
        </CustomForm.Button>
      </div>
    </CustomForm>
  );
};
