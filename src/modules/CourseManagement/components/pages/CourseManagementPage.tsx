import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseFilter } from '@/modules/CourseManagement/components/filters/CourseFilter';
import { CourseTable } from '@/modules/CourseManagement/components/tables/CourseTable';
import { getDefaultFilters } from '@/modules/CourseManagement/components/utils/getDefaultFilters';
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

  const { confirmDelete } = useDialog();

  const courseManagementQuery = useQuery({
    queryKey: ['courses', filters],
    queryFn: () => CourseManagementService.getCourses(filters)
  });

  const courseDeleteMutation = useMutation({
    mutationKey: ['course-delete'],
    mutationFn: (id: string) => CourseManagementService.deleteCourse(id),
    onSuccess: () => {
      toast.success('Course deleted successfully');
      courseManagementQuery.refetch();
    },
    onError: () => {
      toast.error('Failed to delete course');
    }
  });

  const handleEdit = (course: Course) => {
    console.log(course);
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Course Management</h1>
        <Button onClick={() => navigate('/course-management/new')}>
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
    </div>
  );
};
