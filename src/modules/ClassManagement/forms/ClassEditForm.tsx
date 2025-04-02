import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import type { Class } from '@/modules/ClassManagement/types/class.types';
import type { Course } from '@/modules/CourseManagement/types/course.types';
import type { Staff } from '@/modules/StaffManagement/types/staffManagement.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const classEditSchema = z.object({
  course_id: z.number().optional(),
  teacher_id: z.number().optional(),
  name: z.string().min(1, 'Class name is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  date_range: z
    .object({
      from: z.date(),
      to: z.date()
    })
    .optional(),
  capacity: z.number().min(1, 'Capacity must be at least 1').optional()
});

type ClassEditFormData = z.infer<typeof classEditSchema>;

interface ClassEditFormProps {
  classData: Class;
  courses: Course[];
  teachers: Staff[];
  onSubmit: (data: ClassEditFormData) => void;
  isPending: boolean;
  onCancel: () => void;
}

export const ClassEditForm = ({
  classData,
  courses,
  teachers,
  onSubmit,
  isPending,
  onCancel
}: ClassEditFormProps) => {
  const formMethods = useForm<ClassEditFormData>({
    resolver: zodResolver(classEditSchema),
    defaultValues: {
      name: classData.name,
      description: classData.description,
      course_id: classData.course?.id,
      teacher_id: classData.teacher?.id,
      capacity: classData.capacity,
      date_range: {
        from: new Date(classData.start_date),
        to: new Date(classData.end_date)
      }
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
          {isPending ? 'Saving Changes...' : 'Save Changes'}
        </CustomForm.Button>
      </div>
    </CustomForm>
  );
};
