import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UpdateStatusDialog } from '@/modules/StudentClassEnrollment/components/dialogs/UpdateStatusDialog';
import { EnrollmentFilter } from '@/modules/StudentClassEnrollment/components/filters/EnrollmentFilter';
import { EnrollmentTable } from '@/modules/StudentClassEnrollment/components/tables/EnrollmentTable';
import type { UpdateEnrollmentFormData } from '@/modules/StudentClassEnrollment/schemas/enrollment.schema';
import { EnrollmentManagementService } from '@/modules/StudentClassEnrollment/services/enrollmentManagement.service';
import type {
  Enrollment,
  EnrollmentFilterParams
} from '@/modules/StudentClassEnrollment/types/enrollment.types';
import { getDefaultFilters } from '@/modules/StudentClassEnrollment/utils/getDefaultFilters';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export const StudentClassEnrollmentPage = () => {
  const { confirm } = useDialog();
  const [filters, setFilters] = useState<EnrollmentFilterParams>(getDefaultFilters());
  const [selectedEnrollmentIds, setSelectedEnrollmentIds] = useState<number[]>([]);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  const enrollmentsQuery = useQuery({
    queryKey: ['enrollments', filters],
    queryFn: () => EnrollmentManagementService.getEnrollments(filters)
  });

  const updateEnrollmentMutation = useMutation({
    mutationKey: ['update-enrollment'],
    mutationFn: (data: UpdateEnrollmentFormData) =>
      EnrollmentManagementService.updateEnrollment(data.id, data),
    onSuccess: (data) => {
      toast.success(data.message || 'Enrollment status updated successfully');
      setUpdateDialogOpen(false);
      enrollmentsQuery.refetch();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update enrollment status');
    }
  });

  const sendEmailMutation = useMutation({
    mutationKey: ['send-enrollment-email'],
    mutationFn: (enrollmentIds: number[]) =>
      EnrollmentManagementService.sendManualEnrollmentEmail({ enrollment_ids: enrollmentIds }),
    onSuccess: (data) => {
      toast.success(data.message || 'Enrollment email sent successfully');
      setSelectedEnrollmentIds([]);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to send enrollment email');
    }
  });

  const handleSelect = (enrollment: Enrollment, checked: boolean) => {
    setSelectedEnrollmentIds((prev) =>
      checked ? [...prev, enrollment.id] : prev.filter((id) => id !== enrollment.id)
    );
  };

  const handleSendEmails = () => {
    if (selectedEnrollmentIds.length === 0) {
      toast.error('Please select at least one enrollment');
      return;
    }

    confirm({
      title: 'Send Enrollment Emails',
      content: `Are you sure you want to send enrollment emails to ${selectedEnrollmentIds.length} student(s)?`,
      onConfirm: () => {
        sendEmailMutation.mutate(selectedEnrollmentIds);
      }
    });
  };

  const handleUpdateStatusDialog = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    setUpdateDialogOpen(true);
  };

  const handleUpdateStatusSubmit = (data: UpdateEnrollmentFormData) => {
    if (!selectedEnrollment) {
      toast.error('No enrollment selected');
      return;
    }

    updateEnrollmentMutation.mutate({
      ...data,
      id: selectedEnrollment.id
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Class Enrollments</h1>
        <Button
          variant="default"
          onClick={handleSendEmails}
          disabled={selectedEnrollmentIds.length === 0}
        >
          Send Enrollment Emails
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <EnrollmentFilter filters={filters} onFilterChange={setFilters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment List</CardTitle>
        </CardHeader>
        <CardContent>
          <EnrollmentTable
            loading={enrollmentsQuery.isPending}
            enrollments={enrollmentsQuery.data?.data || []}
            onSelect={handleSelect}
            onUpdateStatus={handleUpdateStatusDialog}
          />

          <div className="mt-4">
            <Pagination
              currentPage={filters.current_page ?? 1}
              totalCount={enrollmentsQuery.data?.meta?.total ?? 1}
              pageSize={filters.per_page ?? 15}
              pageSizeOptions={[15, 20, 30, 50]}
              onPageChange={(page) => {
                setFilters({
                  ...filters,
                  current_page: page
                });
              }}
              onPageSizeChange={(pageSize) => {
                setFilters({
                  ...filters,
                  per_page: pageSize,
                  current_page: 1
                });
              }}
            />
          </div>
        </CardContent>
      </Card>

      <UpdateStatusDialog
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        onUpdate={handleUpdateStatusSubmit}
        isPending={updateEnrollmentMutation.isPending}
      />
    </div>
  );
};
