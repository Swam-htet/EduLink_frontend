import Pagination from '@/components/common/Pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RejectRegistrationDialog } from '@/modules/StudentManagement/components/dialogs/RejectRegistrationDialog';
import { StudentFilter } from '@/modules/StudentManagement/components/filters/StudentFilter';
import { StudentTable } from '@/modules/StudentManagement/components/tables/StudentTable';
import StudentManagementService from '@/modules/StudentManagement/services/studentManagement.service';
import type {
  Student,
  StudentFilterParams
} from '@/modules/StudentManagement/types/studentManagement.types';
import { getDefaultFilters } from '@/modules/StudentManagement/utils/getDefaultFilters';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const StudentManagementPage = () => {
  const navigate = useNavigate();
  const { confirm } = useDialog();
  const [filters, setFilters] = useState<StudentFilterParams>(getDefaultFilters());
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const studentQuery = useQuery({
    queryKey: ['students', filters],
    queryFn: () => StudentManagementService.getStudents(filters)
  });

  const approveRegistrationMutation = useMutation({
    mutationKey: ['approve-registration'],
    mutationFn: (id: number) => StudentManagementService.approveRegistration({ id }),
    onSuccess: (data) => {
      toast.success(data.message || 'Registration approved successfully');
      studentQuery.refetch();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to approve registration');
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
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to reject registration');
    }
  });

  const handleRowClick = (student: Student) => {
    navigate(`/student-management/${student.id}`);
  };

  const handleApprove = (student: Student) => {
    confirm({
      title: 'Approve Registration',
      content: `Are you sure you want to approve the registration for ${student.first_name} ${student.last_name}?`,
      onConfirm: () => {
        approveRegistrationMutation.mutate(student.id);
      }
    });
  };

  const handleReject = (student: Student) => {
    setSelectedStudent(student);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = (id: number, reason: string) => {
    rejectRegistrationMutation.mutate({ id, reason });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Student Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentFilter filters={filters} onFilterChange={setFilters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentTable
            data={studentQuery.data?.data || []}
            isLoading={studentQuery.isPending}
            onRowClick={handleRowClick}
            onApprove={handleApprove}
            onReject={handleReject}
          />
          <div>
            <Pagination
              currentPage={filters.current_page ?? 1}
              totalCount={studentQuery.data?.meta?.total ?? 1}
              pageSize={filters.per_page ?? 15}
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

      {/* Reject Dialog */}
      <RejectRegistrationDialog
        isOpen={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onReject={handleRejectConfirm}
        student={selectedStudent}
        isPending={rejectRegistrationMutation.isPending}
      />
    </div>
  );
};
