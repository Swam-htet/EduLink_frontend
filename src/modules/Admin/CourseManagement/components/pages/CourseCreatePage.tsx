import BackButton from '@/components/common/BackButtton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCreateForm } from '@/modules/Admin/CourseManagement/forms/CourseCreateForm';
import { CourseCreateFormData } from '@/modules/Admin/CourseManagement/schemas/course.schema';
import CourseManagementService from '@/modules/Admin/CourseManagement/services/CourseManagement.service';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CourseCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { confirm } = useDialog();

  const courseCreateMutation = useMutation({
    mutationKey: ['course-management-create'],
    mutationFn: (data: CourseCreateFormData) => CourseManagementService.createCourse(data),
    onSuccess: () => {
      toast.success('Course created successfully');
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ['course-management'] });
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
        <BackButton navigate={navigate} />
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
