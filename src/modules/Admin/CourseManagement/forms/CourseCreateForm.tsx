import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { CourseCreateFormData } from '../schemas/course.schema';
import { courseCreateSchema } from '../schemas/course.schema';

interface CourseCreateFormProps {
  onSubmit: (data: CourseCreateFormData) => void;
  isPending: boolean;
  onCancel: () => void;
}

export const CourseCreateForm = ({ onSubmit, isPending, onCancel }: CourseCreateFormProps) => {
  const formMethods = useForm<CourseCreateFormData>({
    resolver: zodResolver(courseCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: ''
    }
  });

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <CustomForm.Input
          field={{
            name: 'title',
            label: 'Title',
            placeholder: 'Enter course title'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'duration',
            label: 'Duration',
            placeholder: 'Enter course duration'
          }}
        />
      </div>

      <CustomForm.Textarea
        field={{
          name: 'description',
          label: 'Description',
          placeholder: 'Enter course description'
        }}
      />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <CustomForm.Button type="submit" state={isPending ? 'loading' : 'default'}>
          {isPending ? 'Creating Course...' : 'Create Course'}
        </CustomForm.Button>
      </div>
    </CustomForm>
  );
};
