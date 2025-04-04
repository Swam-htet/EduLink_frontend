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
import {
  CourseUpdateFormData,
  courseUpdateSchema
} from '@/modules/Admin/CourseManagement/schemas/course.schema';
import { Course } from '@/modules/Admin/CourseManagement/types/course.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface CourseUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
  onUpdate: (data: CourseUpdateFormData) => void;
}

export const CourseUpdateDialog = ({
  open,
  onOpenChange,
  course,
  onUpdate
}: CourseUpdateDialogProps) => {
  const formMethods = useForm<CourseUpdateFormData>({
    resolver: zodResolver(courseUpdateSchema),
    defaultValues: {
      id: course.id,
      title: course.title,
      description: course.description,
      duration: String(course.duration)
    }
  });

  const handleSubmit = async (data: CourseUpdateFormData) => {
    onUpdate(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Course</DialogTitle>
          <DialogDescription>
            Make changes to the course details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CustomForm formMethods={formMethods} onSubmit={handleSubmit} className="space-y-4">
          <CustomForm.Input
            field={{
              name: 'title',
              label: 'Title',
              placeholder: 'Enter course title'
            }}
          />

          <CustomForm.Textarea
            field={{
              name: 'description',
              label: 'Description',
              placeholder: 'Enter course description'
            }}
          />

          <CustomForm.Input
            field={{
              name: 'duration',
              label: 'Duration in months',
              placeholder: 'Enter course duration in months'
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
};
