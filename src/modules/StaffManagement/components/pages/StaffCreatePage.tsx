import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { StaffCreateFormData } from '../../schemas/staff.schema';
import StaffManagementService from '../../services/staffManagement.service';
import { StaffCreateForm } from '../form/StaffCreateForm';

export const StaffCreatePage = () => {
  const navigate = useNavigate();

  const createStaffMutation = useMutation({
    mutationFn: StaffManagementService.createStaff,
    onSuccess: () => {
      toast.success('Staff created successfully');
      navigate(-1);
    },
    onError: () => {
      toast.error('Failed to create staff');
    }
  });

  const onBackBtnClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (data: StaffCreateFormData) => {
    await createStaffMutation.mutateAsync(data);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBackBtnClick}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
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
