import BackButton from '@/components/common/BackButtton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ClassEditForm } from '@/modules/Admin/ClassManagement/forms/ClassEditForm';
import { ClassManagementService } from '@/modules/Admin/ClassManagement/services/classManagement.service';
import { CourseManagementService } from '@/modules/Admin/CourseManagement/services/CourseManagement.service';
import { StaffManagementService } from '@/modules/Admin/StaffManagement/services/staffManagement.service';
import { StaffRole } from '@/modules/Admin/StaffManagement/types/staffManagement.types';
import { useDialog } from '@/providers/dialog/useDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const ClassEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { confirm } = useDialog();

  const classQuery = useQuery({
    queryKey: ['class-management', id],
    queryFn: () => ClassManagementService.getClassById(id as string),
    enabled: !!id
  });

  const coursesQuery = useQuery({
    queryKey: ['course-management'],
    queryFn: () => CourseManagementService.getCourses()
  });

  const teachersQuery = useQuery({
    queryKey: ['staff-management'],
    queryFn: () => StaffManagementService.getStaffList({ role: StaffRole.Teacher })
  });

  const updateClassMutation = useMutation({
    mutationFn: (data: any) => {
      const transformedData = {
        ...data,
        start_date: data.date_range?.from.toISOString().split('T')[0],
        end_date: data.date_range?.to.toISOString().split('T')[0]
      };
      return ClassManagementService.updateClass(id as string, transformedData);
    },
    onSuccess: () => {
      toast.success('Class updated successfully');
      navigate(`${ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT}/${id}`);
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update class');
    }
  });

  const handleSubmit = (data: any) => {
    updateClassMutation.mutate(data);
  };

  const handleCancel = () => {
    confirm({
      title: 'Discard Changes',
      content: 'Are you sure you want to discard your changes?',
      onConfirm: () => navigate(`${ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT}/${id}`)
    });
  };

  if (classQuery.isPending || coursesQuery.isPending || teachersQuery.isPending) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex items-center gap-2">
          <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-r-transparent" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (classQuery.isError || !classQuery.data?.data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Class not found</h2>
          <p className="text-muted-foreground">
            The class you're looking for doesn't exist or you don't have access.
          </p>
        </div>
        <Button onClick={() => navigate(ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT)}>
          Back to Class List
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <BackButton navigate={navigate} />
        <h1 className="text-xl font-semibold">Edit Class</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassEditForm
            classData={classQuery.data.data}
            courses={coursesQuery.data?.data || []}
            teachers={teachersQuery.data?.data || []}
            onSubmit={handleSubmit}
            isPending={updateClassMutation.isPending}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassEditPage;
