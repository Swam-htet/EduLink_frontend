import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { ClassCreateFormData } from '@/modules/ClassManagement/schemas/class.schema';
import { classCreateSchema } from '@/modules/ClassManagement/schemas/class.schema';
import type { Course } from '@/modules/CourseManagement/types/course.types';
import type { Staff } from '@/modules/StaffManagement/types/staffManagement.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
      capacity: '1'
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
            placeholder: 'Enter class capacity'
          }}
        />

        <CustomForm.DatePicker
          field={{
            name: 'start_date',
            label: 'Start Date',
            placeholder: 'Select start date'
          }}
        />

        <CustomForm.DatePicker
          field={{
            name: 'end_date',
            label: 'End Date',
            placeholder: 'Select end date'
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
