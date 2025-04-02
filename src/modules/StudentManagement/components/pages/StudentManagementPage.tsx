import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import ClassManagementService from '@/modules/ClassManagement/services/classManagement.service';
import { ClassInvitationDialog } from '@/modules/StudentManagement/components/dialogs/ClassInvitationDialog';
import { StudentFilter } from '@/modules/StudentManagement/components/filters/StudentFilter';
import { StudentTable } from '@/modules/StudentManagement/components/tables/StudentTable';
import { StudentFilterParams } from '@/modules/StudentManagement/schemas/studentManagement.schema';
import StudentManagementService from '@/modules/StudentManagement/services/studentManagement.service';
import type {
  SendClassInviteRequest,
  Student
} from '@/modules/StudentManagement/types/studentManagement.types';
import { getDefaultFilters } from '@/modules/StudentManagement/utils/getDefaultFilters';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface StudentWithSelected extends Student {
  selected: boolean;
}

const checkValidation = (student: StudentWithSelected) => {
  return student.status == 'active';
};

export const StudentManagementPage = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<StudentFilterParams>(getDefaultFilters());

  const [classInvitationDialogOpen, setClassInvitationDialogOpen] = useState(false);

  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  console.log('selectedStudents', selectedStudents);

  const studentQuery = useQuery({
    queryKey: ['student-management', filters],
    queryFn: () => StudentManagementService.getStudents(filters)
  });

  const classQuery = useQuery({
    queryKey: ['class-management'],
    queryFn: () => ClassManagementService.getAllOngoingClasses()
  });

  const sendClassInviteMutation = useMutation({
    mutationKey: ['send-class-invite'],
    mutationFn: (data: SendClassInviteRequest) => StudentManagementService.sendClassInvite(data),
    onSuccess: (data) => {
      toast.success(data.message || 'Class invite sent successfully');
      setClassInvitationDialogOpen(false);
      navigate(PRIVATE_ENDPOINTS.STUDENT_CLASS_ENROLLMENT);
    },
    onError: () => {
      toast.error('Failed to send class invite');
    }
  });

  const handleSelect = (student: StudentWithSelected, checked: boolean) => {
    setSelectedStudents((prev) => {
      if (checked) {
        return [...prev, student.id];
      } else {
        return prev.filter((id) => id !== student.id);
      }
    });
  };

  const handleSendClassInvite = () => {
    setClassInvitationDialogOpen(true);
  };

  const handleClassInviteSubmit = (classId: number) => {
    sendClassInviteMutation.mutate({
      student_ids: selectedStudents,
      class_id: classId
    });
  };

  const handleRowClick = (student: StudentWithSelected) => {
    navigate(PRIVATE_ENDPOINTS.STUDENT_DETAIL.replace(':id', student.id.toString()));
  };

  const classes = classQuery.data?.data;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Student Management</h1>
        <Button variant="default" onClick={handleSendClassInvite}>
          Send Class Invite
        </Button>
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
            data={
              studentQuery.data?.data.map((student) => ({
                ...student,
                selected: selectedStudents.includes(student.id)
              })) || []
            }
            isLoading={studentQuery.isPending}
            onRowClick={handleRowClick}
            selectedRows={selectedStudents}
            onSelect={handleSelect}
            checkValidation={checkValidation}
          />
          <div>
            <Pagination
              currentPage={filters.current_page ?? 1}
              totalCount={studentQuery.data?.meta?.total ?? 1}
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

      {/* Class Invitation Dialog */}
      <ClassInvitationDialog
        selectedStudents={selectedStudents}
        isOpen={classInvitationDialogOpen}
        onClose={() => setClassInvitationDialogOpen(false)}
        onSubmit={handleClassInviteSubmit}
        isPending={sendClassInviteMutation.isPending}
        classes={classes || []}
      />
    </div>
  );
};
