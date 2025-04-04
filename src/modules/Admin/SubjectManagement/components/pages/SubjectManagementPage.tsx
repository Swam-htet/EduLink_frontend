import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CourseManagementService from '@/modules/Admin/CourseManagement/services/CourseManagement.service';
import { SubjectFilter } from '@/modules/Admin/SubjectManagement/components/filters/SubjectFilter';
import { SubjectUpdateDialog } from '@/modules/Admin/SubjectManagement/components/SubjectUpdateDialog';
import { SubjectTable } from '@/modules/Admin/SubjectManagement/components/tables/SubjectTable';
import {
  SubjectFilterParams,
  type SubjectUpdateFormData
} from '@/modules/Admin/SubjectManagement/schemas/subject.schema';
import SubjectManagementService from '@/modules/Admin/SubjectManagement/services/SubjectManagement.service';
import type { Subject } from '@/modules/Admin/SubjectManagement/types/subject.types';
import { getDefaultFilters } from '@/modules/Admin/SubjectManagement/utils/getDefaultFilters';
import { useDialog } from '@/providers/dialog/useDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const SubjectManagementPage = () => {
  const navigate = useNavigate();
  const { confirmDelete } = useDialog();
  const [filters, setFilters] = useState<SubjectFilterParams>(getDefaultFilters());
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const subjectManagementQuery = useQuery({
    queryKey: ['subject-management', filters],
    queryFn: () => SubjectManagementService.getSubjects(filters)
  });

  const { data: coursesData } = useQuery({
    queryKey: ['course-management'],
    queryFn: () => CourseManagementService.getCourses()
  });

  const subjectDeleteMutation = useMutation({
    mutationFn: (subjectId: string) => SubjectManagementService.deleteSubject(subjectId),
    onSuccess: () => {
      subjectManagementQuery.refetch();
      toast.success('Subject deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete subject');
    }
  });

  const subjectUpdateMutation = useMutation({
    mutationFn: (subject: SubjectUpdateFormData) =>
      SubjectManagementService.updateSubject(subject.id.toString(), subject),
    onSuccess: () => {
      subjectManagementQuery.refetch();
      toast.success('Subject updated successfully');
    },
    onError: () => {
      toast.error('Failed to update subject');
    }
  });

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdate = async (data: SubjectUpdateFormData) => {
    subjectUpdateMutation.mutate(data);
  };

  const handleDelete = (subject: Subject) => {
    confirmDelete({
      title: 'Delete Subject',
      content: 'Are you sure you want to delete this subject?',
      onDelete: () => {
        subjectDeleteMutation.mutate(subject.id.toString());
      }
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Subject Management</h1>
        <Button onClick={() => navigate('/subject-management/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Subject
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectFilter
            filters={filters}
            onFilterChange={setFilters}
            courses={coursesData?.data || []}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subject List</CardTitle>
        </CardHeader>
        <CardContent>
          <SubjectTable
            data={subjectManagementQuery.data?.data || []}
            isLoading={subjectManagementQuery.isPending}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {selectedSubject && (
        <SubjectUpdateDialog
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          subject={selectedSubject}
          courses={coursesData?.data || []}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};
