import BackButton from '@/components/common/BackButtton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import StaffManagementService from '@/modules/Admin/StaffManagement/services/staffManagement.service';
import { useDialog } from '@/providers/dialog/useDialog';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

export const StaffDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { confirmDelete } = useDialog();

  const { data: staffData, isLoading } = useQuery({
    queryKey: ['staff', id],
    queryFn: () => StaffManagementService.getStaffDetail(id as string),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const staff = staffData?.data;

  if (!staff) {
    return <div className="flex h-full items-center justify-center">Staff not found</div>;
  }

  const staffDetails = [
    {
      label: 'Full Name',
      value: `${staff.first_name} ${staff.last_name}`
    },
    {
      label: 'Email',
      value: staff.email
    },
    {
      label: 'Phone',
      value: staff.phone
    },
    {
      label: 'NRC',
      value: staff.nrc
    },
    {
      label: 'Gender',
      value: staff.gender.charAt(0).toUpperCase() + staff.gender.slice(1)
    },
    {
      label: 'Role',
      value: staff.role.charAt(0).toUpperCase() + staff.role.slice(1)
    },
    {
      label: 'Date of Birth',
      value: format(new Date(staff.date_of_birth), 'PPP')
    },
    {
      label: 'Address',
      value: staff.address
    },
    {
      label: 'Status',
      value: staff.status,
      render: (value: string) => (
        <span
          className={cn(
            'inline-flex rounded-full px-2 py-1 text-xs font-medium',
            value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      label: 'Joined Date',
      value: format(new Date(staff.joined_date), 'PPP')
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton navigate={navigate} />
        <h1 className="text-xl font-semibold">Staff Details</h1>
      </div>

      {/* Staff Information */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {staffDetails.map((detail, index) => (
              <div key={index} className="space-y-1">
                <p className="text-muted-foreground text-sm">{detail.label}</p>
                <p className="font-medium">
                  {detail.render ? detail.render(detail.value) : detail.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline" onClick={() => navigate(`/staff-management/edit/${id}`)}>
            Edit Staff
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              confirmDelete({
                title: 'Delete Staff',
                content: 'Are you sure you want to delete this staff?',
                onConfirm: () => {
                  console.log('Delete staff');
                }
              });
            }}
          >
            Delete Staff
          </Button>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default StaffDetailPage;
