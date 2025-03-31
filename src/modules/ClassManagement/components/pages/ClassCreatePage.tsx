import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClassCreateForm } from '@/modules/ClassManagement/forms/ClassCreateForm';
import type { ClassCreateFormData } from '@/modules/ClassManagement/schemas/class.schema';
import { ClassManagementService } from '@/modules/ClassManagement/services/classManagement.service';
import { CourseManagementService } from '@/modules/CourseManagement/services/CourseManagement.service';
import { StaffManagementService } from '@/modules/StaffManagement/services/staffManagement.service';
import { StaffRole } from '@/modules/StaffManagement/types/staffManagement.types';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ClassCreatePage = () => {
  const navigate = useNavigate();
  const { confirm } = useDialog();

  // Fetch courses for dropdown
  const coursesQuery = useQuery({
    queryKey: ['courses'],
    queryFn: () => CourseManagementService.getCourses()
  });

  // Fetch teachers for dropdown
  const teachersQuery = useQuery({
    queryKey: ['teachers'],
    queryFn: () => StaffManagementService.getStaffList({ role: StaffRole.Teacher })
  });

  const createClassMutation = useMutation({
    mutationKey: ['class-create'],
    mutationFn: (data: ClassCreateFormData) => {
      const transformedData = {
        ...data,
        start_date: data.date_range.from.toISOString().split('T')[0],
        end_date: data.date_range.to.toISOString().split('T')[0]
      };
      return ClassManagementService.createClass(transformedData);
    },
    onSuccess: (response) => {
      toast.success('Class created successfully');
      navigate(`/class-management/${response.data.id}`);
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create class');
    }
  });

  const handleSubmit = (data: ClassCreateFormData) => {
    createClassMutation.mutate(data);
  };

  const handleCancel = () => {
    confirm({
      title: 'Are you sure?',
      content: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
      onConfirm: () => navigate('/class-management')
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/class-management')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
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
