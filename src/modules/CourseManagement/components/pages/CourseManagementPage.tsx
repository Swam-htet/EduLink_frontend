import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { CourseUpdateDialog } from '@/modules/CourseManagement/components/dialog/CourseUpdateDialog';
import { CourseFilter } from '@/modules/CourseManagement/components/filters/CourseFilter';
import { CourseTable } from '@/modules/CourseManagement/components/tables/CourseTable';
import { getDefaultFilters } from '@/modules/CourseManagement/components/utils/getDefaultFilters';
import { CourseUpdateFormData } from '@/modules/CourseManagement/schemas/course.schema';
import CourseManagementService from '@/modules/CourseManagement/services/CourseManagement.service';
import type { Course, CourseFilterParams } from '@/modules/CourseManagement/types/course.types';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CourseManagementPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CourseFilterParams>(getDefaultFilters());
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { confirmDelete } = useDialog();

  const courseManagementQuery = useQuery({
    queryKey: ['courses-management', filters],
    queryFn: () => CourseManagementService.getCourses(filters)
  });

  const courseUpdateMutation = useMutation({
    mutationKey: ['course-management-update'],
    mutationFn: (course: CourseUpdateFormData) =>
      CourseManagementService.updateCourse(course.id.toString(), {
        title: course.title,
        description: course.description,
        duration: course.duration
      }),
    onSuccess: () => {
      toast.success('Course updated successfully');
    },
    onError: () => {
      toast.error('Failed to update course');
    }
  });

  const courseDeleteMutation = useMutation({
    mutationKey: ['course-management-delete'],
    mutationFn: (id: string) => CourseManagementService.deleteCourse(id),
    onSuccess: () => {
      toast.success('Course deleted successfully');
      courseManagementQuery.refetch();
    },
    onError: () => {
      toast.error('Failed to delete course');
    }
  });

  const handleEditSubmit = (course: CourseUpdateFormData) => {
    courseUpdateMutation.mutate(course);
    setEditDialogOpen(false);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setEditDialogOpen(true);
  };

  const handleDelete = (course: Course) => {
    confirmDelete({
      title: 'Delete Course',
      content: 'Are you sure you want to delete this course?',
      onDelete: () => {
        courseDeleteMutation.mutate(course.id.toString());
      }
    });
  };

  const handleCreate = () => {
    navigate(PRIVATE_ENDPOINTS.COURSE_CREATE);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Course Management</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseFilter filters={filters} onFilterChange={setFilters} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course List</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseTable
            data={courseManagementQuery.data?.data || []}
            isLoading={courseManagementQuery.isPending}
            onRowClick={() => {}}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {selectedCourse && (
        <CourseUpdateDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          course={selectedCourse}
          onUpdate={handleEditSubmit}
        />
      )}
    </div>
  );
};
