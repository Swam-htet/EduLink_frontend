import BackButton from '@/components/common/BackButtton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ClassCreateForm } from '@/modules/Admin/ClassManagement/forms/ClassCreateForm';
import type { ClassCreateFormData } from '@/modules/Admin/ClassManagement/schemas/class.schema';
import { ClassManagementService } from '@/modules/Admin/ClassManagement/services/classManagement.service';
import { CourseManagementService } from '@/modules/Admin/CourseManagement/services/CourseManagement.service';
import { StaffManagementService } from '@/modules/Admin/StaffManagement/services/staffManagement.service';
import { StaffRole } from '@/modules/Admin/StaffManagement/types/staffManagement.types';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ClassCreatePage = () => {
  const navigate = useNavigate();
  const { confirm } = useDialog();
  const queryClient = useQueryClient();

  // Fetch courses for dropdown
  const coursesQuery = useQuery({
    queryKey: ['course-management'],
    queryFn: () => CourseManagementService.getCourses()
  });

  // Fetch teachers for dropdown
  const teachersQuery = useQuery({
    queryKey: ['staff-management'],
    queryFn: () => StaffManagementService.getStaffList({ role: StaffRole.Teacher })
  });

  const createClassMutation = useMutation({
    mutationKey: ['class-create'],
    mutationFn: (data: ClassCreateFormData) => {
      return ClassManagementService.createClass(data);
    },
    onSuccess: () => {
      toast.success('Class created successfully');
      navigate(ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT);
      queryClient.invalidateQueries({ queryKey: ['class-management'] });
    },
    onError: () => {
      toast.error('Failed to create class');
    }
  });

  const handleSubmit = (data: ClassCreateFormData) => {
    createClassMutation.mutate(data);
  };

  const handleCancel = () => {
    confirm({
      title: 'Are you sure?',
      content: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
      onConfirm: () => navigate(ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT)
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <BackButton navigate={navigate} />
        <h1 className="text-xl font-semibold">Create Class</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassCreateForm
            onSubmit={handleSubmit}
            isPending={createClassMutation.isPending}
            onCancel={handleCancel}
            courses={coursesQuery.data?.data || []}
            teachers={teachersQuery.data?.data || []}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassCreatePage;
