import BackButton from '@/components/common/BackButtton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import StaffCreateForm from '@/modules/StaffManagement/components/form/StaffCreateForm';
import { type StaffCreateFormData } from '@/modules/StaffManagement/schemas/staff.schema';
import StaffManagementService from '@/modules/StaffManagement/services/staffManagement.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const StaffCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createStaffMutation = useMutation({
    mutationFn: StaffManagementService.createStaff,
    onSuccess: () => {
      toast.success('Staff created successfully');
      navigate(PRIVATE_ENDPOINTS.STAFF_MANAGEMENT);
      queryClient.invalidateQueries({ queryKey: ['staff-management'] });
    },
    onError: () => {
      toast.error('Failed to create staff');
    }
  });

  const handleSubmit = async (data: StaffCreateFormData) => {
    await createStaffMutation.mutateAsync(data);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton navigate={navigate} />
        <h1 className="text-xl font-semibold">Create New Staff</h1>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Information</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffCreateForm onSubmit={handleSubmit} loading={createStaffMutation.isPending} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffCreatePage;
