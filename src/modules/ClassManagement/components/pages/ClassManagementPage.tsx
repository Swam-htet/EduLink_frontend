import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ClassFilter } from '@/modules/ClassManagement/components/filters/ClassFilter';
import ClassTable from '@/modules/ClassManagement/components/tables/ClassTable';
import { ClassFilterFormValues } from '@/modules/ClassManagement/schemas/class.schema';
import { ClassManagementService } from '@/modules/ClassManagement/services/classManagement.service';
import type { Class } from '@/modules/ClassManagement/types/class.types';
import { createDefaultFilterParams } from '@/modules/ClassManagement/utils';
import { CourseManagementService } from '@/modules/CourseManagement/services/CourseManagement.service';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ClassManagementPage = () => {
  const navigate = useNavigate();
  const [filterParams, setFilterParams] = useState<ClassFilterFormValues>(
    createDefaultFilterParams()
  );

  const classesQuery = useQuery({
    queryKey: ['class-management', filterParams],
    queryFn: () => ClassManagementService.getClasses(filterParams)
  });

  const courseQuery = useQuery({
    queryKey: ['course-management'],
    queryFn: () => CourseManagementService.getCourses()
  });

  const handleRowClick = (classItem: Class) => {
    navigate(`/class-management/${classItem.id}`);
  };

  const handleCreateClick = () => {
    navigate(PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_CREATE);
  };

  // courses
  const courses = courseQuery.data?.data;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Class Management</h1>
        <Button onClick={handleCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassFilter
            filters={filterParams}
            onFilterChange={setFilterParams}
            courses={courses ?? []}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <ClassTable
            data={classesQuery.data?.data ?? []}
            loading={classesQuery.isPending}
            onRowClick={handleRowClick}
          />
          <Pagination
            currentPage={filterParams.current_page ?? 1}
            totalCount={classesQuery.data?.meta?.total ?? 0}
            pageSize={filterParams.per_page ?? 15}
            onPageChange={(page) => {
              setFilterParams({
                ...filterParams,
                current_page: page
              });
            }}
            onPageSizeChange={(pageSize) => {
              setFilterParams({
                ...filterParams,
                per_page: pageSize,
                current_page: 1
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassManagementPage;
