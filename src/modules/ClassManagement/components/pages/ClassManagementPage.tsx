import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import ClassTable from '@/modules/ClassManagement/components/tables/ClassTable';
import { ClassManagementService } from '@/modules/ClassManagement/services/classManagement.service';
import type { Class, ClassFilterParams } from '@/modules/ClassManagement/types/class.types';
import { createDefaultFilterParams } from '@/modules/ClassManagement/utils';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassFilter } from '../filters/ClassFilter';

export const ClassManagementPage = () => {
  const navigate = useNavigate();
  const [filterParams, setFilterParams] = useState<ClassFilterParams>(createDefaultFilterParams());
  const [classList, setClassList] = useState<Class[]>([]);

  const classesQuery = useQuery({
    queryKey: ['classes', filterParams],
    queryFn: () => ClassManagementService.getClasses(filterParams)
  });

  useEffect(() => {
    if (classesQuery.data && classesQuery.isSuccess) {
      setClassList(classesQuery.data.data);
    }
  }, [classesQuery.data, classesQuery.isSuccess, filterParams]);

  const handleFilterChange = (newFilters: ClassFilterParams) => {
    setFilterParams((prev) => ({
      ...prev,
      ...newFilters,
      current_page: 1 // Reset to first page when filters change
    }));
  };

  const handleRowClick = (classItem: Class) => {
    navigate(`/class-management/${classItem.id}`);
  };

  const handleCreateClick = () => {
    navigate(PRIVATE_ENDPOINTS.CLASS_MANAGEMENT_CREATE);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Class Management</h1>
        <Button onClick={handleCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassFilter onFilterChange={handleFilterChange} />
        </CardContent>
      </Card>

      {/* Filters */}

      {/* Table and Pagination */}
      <Card>
        <CardContent>
          <ClassTable
            data={classList}
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
