import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { goToDynamicRoute } from '@/lib/utils';
import { ClassFilter } from '@/modules/Admin/ClassManagement/components/filters/ClassFilter';
import ClassTable from '@/modules/Admin/ClassManagement/components/tables/ClassTable';
import { ClassFilterFormValues } from '@/modules/Admin/ClassManagement/schemas/class.schema';
import { ClassManagementService } from '@/modules/Admin/ClassManagement/services/classManagement.service';
import type { Class } from '@/modules/Admin/ClassManagement/types/class.types';
import { createDefaultFilterParams } from '@/modules/Admin/ClassManagement/utils';
import { CourseManagementService } from '@/modules/Admin/CourseManagement/services/CourseManagement.service';
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
    navigate(
      goToDynamicRoute(ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_DETAIL, classItem.id.toString())
    );
  };

  const handleCreateClick = () => {
    navigate(ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_CREATE);
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
