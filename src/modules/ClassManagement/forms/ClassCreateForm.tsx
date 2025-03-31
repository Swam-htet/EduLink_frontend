import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { Course } from '@/modules/CourseManagement/types/course.types';
import type { Staff } from '@/modules/StaffManagement/types/staffManagement.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { ClassCreateFormData } from '../schemas/class.schema';
import { classCreateSchema } from '../schemas/class.schema';

interface ClassCreateFormProps {
  onSubmit: (data: ClassCreateFormData) => void;
  isPending: boolean;
  onCancel: () => void;
  courses: Course[];
  teachers: Staff[];
}

export const ClassCreateForm = ({
  onSubmit,
  isPending,
  onCancel,
  courses,
  teachers
}: ClassCreateFormProps) => {
  const formMethods = useForm<ClassCreateFormData>({
    resolver: zodResolver(classCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      capacity: 1
    }
  });

  return (
    <CustomForm formMethods={formMethods} onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <CustomForm.Select
          field={{
            name: 'course_id',
            label: 'Course',
            placeholder: 'Select a course',
            options: courses.map((course) => ({
              label: course.title,
              value: course.id.toString()
            }))
          }}
        />

        <CustomForm.Select
          field={{
            name: 'teacher_id',
            label: 'Teacher',
            placeholder: 'Select a teacher',
            options: teachers.map((teacher) => ({
              label: `${teacher.first_name} ${teacher.last_name}`,
              value: teacher.id.toString()
            }))
          }}
        />

        <CustomForm.Input
          field={{
            name: 'name',
            label: 'Class Name',
            placeholder: 'Enter class name'
          }}
        />

        <CustomForm.Input
          field={{
            name: 'capacity',
            label: 'Capacity',
            type: 'number',
            placeholder: 'Enter class capacity'
          }}
        />

        <CustomForm.DateRangePicker
          field={{
            name: 'date_range',
            label: 'Class Duration',
            placeholder: 'Select class duration'
          }}
        />
      </div>

      <CustomForm.Textarea
        field={{
          name: 'description',
          label: 'Description',
          placeholder: 'Enter class description'
        }}
      />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <CustomForm.Button type="submit" state={isPending ? 'loading' : 'default'}>
          {isPending ? 'Creating Class...' : 'Create Class'}
        </CustomForm.Button>
      </div>
    </CustomForm>
  );
};
