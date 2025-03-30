import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCreateForm } from '@/modules/CourseManagement/forms/CourseCreateForm';
import { CourseCreateFormData } from '@/modules/CourseManagement/schemas/course.schema';
import CourseManagementService from '@/modules/CourseManagement/services/CourseManagement.service';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CourseCreatePage = () => {
  const navigate = useNavigate();

  const { confirm } = useDialog();

  const courseCreateMutation = useMutation({
    mutationKey: ['course-create'],
    mutationFn: (data: CourseCreateFormData) => CourseManagementService.createCourse(data),
    onSuccess: () => {
      toast.success('Course created successfully');
      navigate(-1);
    },
    onError: () => {
      toast.error('Failed to create course');
    }
  });

  const handleSubmit = (data: CourseCreateFormData) => {
    courseCreateMutation.mutate(data);
  };

  const handleCancel = () => {
    confirm({
      title: 'Are you sure?',
      content: 'Are you sure you want to cancel?',
      onConfirm: () => navigate(-1)
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">Create Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseCreateForm
            onSubmit={handleSubmit}
            isPending={courseCreateMutation.isPending}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
};
