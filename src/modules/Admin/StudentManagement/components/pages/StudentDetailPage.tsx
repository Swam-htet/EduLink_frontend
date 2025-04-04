import BackButton from '@/components/common/BackButtton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { RejectRegistrationDialog } from '@/modules/Admin/StudentManagement/components/dialogs/RejectRegistrationDialog';
import StudentManagementService from '@/modules/Admin/StudentManagement/services/studentManagement.service';
import { useDialog } from '@/providers/dialog/useDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Mail, Phone, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    case 'suspended':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const StudentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { confirm } = useDialog();
  const queryClient = useQueryClient();
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const studentQuery = useQuery({
    queryKey: ['student-management-detail', id],
    queryFn: () => StudentManagementService.getStudentById(id as string),
    enabled: !!id
  });

  const approveRegistrationMutation = useMutation({
    mutationKey: ['approve-registration'],
    mutationFn: (studentId: number) =>
      StudentManagementService.approveRegistration({ id: studentId }),
    onSuccess: (data) => {
      toast.success(data.message || 'Registration approved successfully');
      studentQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ['student-management'] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to approve registration';
      toast.error(errorMessage);
    }
  });

  const rejectRegistrationMutation = useMutation({
    mutationKey: ['reject-registration'],
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      StudentManagementService.rejectRegistration({ id, reason }),
    onSuccess: (data) => {
      toast.success(data.message || 'Registration rejected successfully');
      setRejectDialogOpen(false);
      studentQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ['student-management'] });
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reject registration';
      toast.error(errorMessage);
    }
  });

  const handleApprove = () => {
    if (!studentQuery.data?.data) return;

    confirm({
      title: 'Approve Registration',
      content: `Are you sure you want to approve the registration for ${studentQuery.data.data.first_name} ${studentQuery.data.data.last_name}?`,
      onConfirm: () => {
        approveRegistrationMutation.mutate(Number(id));
      }
    });
  };

  const handleReject = () => {
    if (!studentQuery.data?.data) return;
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = (studentId: number, reason: string) => {
    rejectRegistrationMutation.mutate({ id: studentId, reason });
  };

  // Loading state
  if (studentQuery.isPending) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex items-center gap-2">
          <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-r-transparent" />
          <span>Loading student information...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (studentQuery.isError || !studentQuery.data?.data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Student not found</h2>
          <p className="text-muted-foreground">
            The student you're looking for doesn't exist or you don't have access.
          </p>
        </div>
        <Button onClick={() => navigate('/student-management')}>Back to Student List</Button>
      </div>
    );
  }

  const student = studentQuery.data.data;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BackButton navigate={navigate} />
          <div>
            <h1 className="text-xl font-semibold">Student Details</h1>
            <p className="text-muted-foreground text-sm">View and manage student information</p>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium',
              getStatusBadgeClass(student.status)
            )}
          >
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full sm:mb-0">
              {student.profile_photo ? (
                <img
                  src={student.profile_photo || 'https://via.placeholder.com/150'}
                  alt={`${student.first_name} ${student.last_name}`}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <UserRound className="text-primary h-8 w-8" />
              )}
            </div>
            <div>
              <CardTitle>
                {student.first_name} {student.last_name}
              </CardTitle>
              <CardDescription>Student ID: {student.student_id}</CardDescription>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row">
            {student.status === 'pending' && (
              <>
                <Button variant="outline" onClick={handleReject}>
                  Reject Registration
                </Button>
                <Button onClick={handleApprove}>Approve Registration</Button>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="guardian">Guardian Information</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Email</h3>
                  <div className="flex items-center gap-2">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    <p>{student.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Phone</h3>
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <p>{student.phone}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Gender</h3>
                  <p className="capitalize">{student.gender}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Date of Birth</h3>
                  <p>{format(new Date(student.date_of_birth), 'PPP')}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-muted-foreground text-sm font-medium">NRC</h3>
                  <p>{student.nrc || 'Not provided'}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Enrollment Date</h3>
                  <p>
                    {student.enrollment_date
                      ? format(new Date(student.enrollment_date), 'PPP')
                      : 'Not enrolled yet'}
                  </p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <h3 className="text-muted-foreground text-sm font-medium">Address</h3>
                  <p>{student.address}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guardian" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Guardian Name</h3>
                  <p>{student.guardian_info.name}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Guardian Phone</h3>
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <p>{student.guardian_info.phone}</p>
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <h3 className="text-muted-foreground text-sm font-medium">Relationship</h3>
                  <p>{student.guardian_info.relationship}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <Separator />

        <CardFooter className="flex justify-between pt-6">
          <div className="text-muted-foreground text-sm">
            Registered on: {format(new Date(student.created_at), 'PPP')}
          </div>
          <div className="text-muted-foreground text-sm">
            Last updated: {format(new Date(student.updated_at), 'PPP')}
          </div>
        </CardFooter>
      </Card>

      {/* Reject Dialog */}
      <RejectRegistrationDialog
        isOpen={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onReject={handleRejectConfirm}
        student={student}
        isPending={rejectRegistrationMutation.isPending}
      />
    </div>
  );
};

export default StudentDetailPage;
