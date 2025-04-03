import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UpdateStatusDialog } from '@/modules/StudentClassEnrollment/components/dialogs/UpdateStatusDialog';
import { EnrollmentFilter } from '@/modules/StudentClassEnrollment/components/filters/EnrollmentFilter';
import { EnrollmentTable } from '@/modules/StudentClassEnrollment/components/tables/EnrollmentTable';
import type {
  EnrollmentFilterFormData,
  UpdateEnrollmentFormData
} from '@/modules/StudentClassEnrollment/schemas/enrollment.schema';
import { EnrollmentManagementService } from '@/modules/StudentClassEnrollment/services/enrollmentManagement.service';
import type { Enrollment } from '@/modules/StudentClassEnrollment/types/enrollment.types';
import { getDefaultFilters } from '@/modules/StudentClassEnrollment/utils/getDefaultFilters';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export const StudentClassEnrollmentPage = () => {
  const { confirm } = useDialog();
  const [filters, setFilters] = useState<EnrollmentFilterFormData>(getDefaultFilters());
  const [selectedEnrollmentIds, setSelectedEnrollmentIds] = useState<number[]>([]);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  const enrollmentsQuery = useQuery({
    queryKey: ['enrollment-management', filters],
    queryFn: () => EnrollmentManagementService.getEnrollments(filters)
  });

  const updateEnrollmentMutation = useMutation({
    mutationKey: ['enrollment-management-update'],
    mutationFn: ({ id, data }: { id: number; data: UpdateEnrollmentFormData }) =>
      EnrollmentManagementService.updateEnrollment(id, data),
    onSuccess: () => {
      toast.success('Enrollment status updated successfully');
      setUpdateDialogOpen(false);
      enrollmentsQuery.refetch();
    },
    onError: () => {
      toast.error('Failed to update enrollment status');
    }
  });

  const sendEmailMutation = useMutation({
    mutationKey: ['enrollment-management-send-email'],
    mutationFn: (enrollmentIds: number[]) =>
      EnrollmentManagementService.sendManualEnrollmentEmail({ enrollment_ids: enrollmentIds }),
    onSuccess: () => {
      toast.success('Enrollment email sent successfully');
      setSelectedEnrollmentIds([]);
    },
    onError: () => {
      toast.error('Failed to send enrollment email');
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
      id: selectedEnrollment.id,
      data
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
