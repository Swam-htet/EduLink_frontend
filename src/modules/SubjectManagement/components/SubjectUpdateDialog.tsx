import CustomForm from '@/components/common/CustomForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import type { Course } from '@/modules/CourseManagement/types/course.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { subjectUpdateSchema, type SubjectUpdateFormData } from '../schemas/subject.schema';
import type { Subject } from '../types/subject.types';

interface SubjectUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: Subject;
  courses: Course[];
  onUpdate: (data: SubjectUpdateFormData) => Promise<void>;
}

export function SubjectUpdateDialog({
  open,
  onOpenChange,
  subject,
  courses,
  onUpdate
}: SubjectUpdateDialogProps) {
  const formMethods = useForm<SubjectUpdateFormData>({
    resolver: zodResolver(subjectUpdateSchema),
    defaultValues: {
      id: subject.id,
      title: subject.title,
      description: subject.description,
      credits: subject.credits.toString(),
      course_id: subject.course?.id.toString() || ''
    }
  });

  const handleSubmit = async (data: SubjectUpdateFormData) => {
    try {
      await onUpdate(data);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update subject:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Subject</DialogTitle>
          <DialogDescription>
            Make changes to the subject details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CustomForm formMethods={formMethods} onSubmit={handleSubmit} className="space-y-4">
          <CustomForm.Input
            field={{
              name: 'title',
              label: 'Title',
              placeholder: 'Enter subject title'
            }}
          />

          <CustomForm.Textarea
            field={{
              name: 'description',
              label: 'Description',
              placeholder: 'Enter subject description'
            }}
          />

          <CustomForm.Input
            field={{
              name: 'credits',
              label: 'Credits',
              type: 'number',
              placeholder: 'Enter number of credits (minimum 1)'
            }}
          />

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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <CustomForm.Button type="submit">Save Changes</CustomForm.Button>
          </DialogFooter>
        </CustomForm>
      </DialogContent>
    </Dialog>
  );
}
