import BackButton from '@/components/common/BackButtton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CourseManagementService from '@/modules/CourseManagement/services/CourseManagement.service';
import { SubjectCreateForm } from '@/modules/SubjectManagement/components/forms/SubjectCreateForm';
import { SubjectCreateFormData } from '@/modules/SubjectManagement/schemas/subject.schema';
import SubjectManagementService from '@/modules/SubjectManagement/services/SubjectManagement.service';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const SubjectCreatePage = () => {
  const navigate = useNavigate();

  const { confirm } = useDialog();
  const queryClient = useQueryClient();

  const courseListQuery = useQuery({
    queryKey: ['courses'],
    queryFn: () => CourseManagementService.getCourses()
  });

  const subjectCreateMutation = useMutation({
    mutationKey: ['subject-management-create'],
    mutationFn: (data: SubjectCreateFormData) => SubjectManagementService.createSubject(data),
    onSuccess: () => {
      toast.success('Subject created successfully');
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ['subject-management'] });
    },
    onError: () => {
      toast.error('Failed to create subject');
    }
  });

  const handleSubmit = (data: SubjectCreateFormData) => {
    subjectCreateMutation.mutate(data);
  };

  const handleCancel = () => {
    confirm({
      title: 'Are you sure?',
      content: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
      onConfirm: () => navigate(-1)
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <BackButton navigate={navigate} />
        <h1 className="text-xl font-semibold">Create Subject</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subject Information</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectCreateForm
            onSubmit={handleSubmit}
            isPending={subjectCreateMutation.isPending}
            onCancel={handleCancel}
            courses={courseListQuery.data?.data || []}
          />
        </CardContent>
      </Card>
    </div>
  );
};
