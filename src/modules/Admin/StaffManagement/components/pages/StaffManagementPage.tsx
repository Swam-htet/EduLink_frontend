import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { StaffFilter } from '@/modules/Admin/StaffManagement/components/filters/StaffFilter';
import StaffTable from '@/modules/Admin/StaffManagement/components/tables/StaffTable';
import { StaffFilterFormValues } from '@/modules/Admin/StaffManagement/schemas/staff.schema';
import { StaffManagementService } from '@/modules/Admin/StaffManagement/services/staffManagement.service';
import { Staff } from '@/modules/Admin/StaffManagement/types/staffManagement.types';
import { createDefaultFilterParams } from '@/modules/Admin/StaffManagement/utils';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StaffManagementPage = () => {
  const [filterParams, setFilterParams] = useState<StaffFilterFormValues>(
    createDefaultFilterParams()
  );

  const navigate = useNavigate();

  const adminStaffManagementListQuery = useQuery({
    queryKey: ['staff-management', filterParams],
    queryFn: () => StaffManagementService.getStaffList(filterParams)
  });

  const onRowClick = (staff: Staff) => {
    navigate(`/staff-management/${staff.id}`);
  };

  const onAddStaffClick = () => {
    navigate(ADMIN_PRIVATE_ENDPOINTS.STAFF_CREATE);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Staff Management</h1>
        <Button variant="outline" onClick={onAddStaffClick}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffFilter filters={filterParams} onFilterChange={setFilterParams} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
        </CardHeader>
        <CardContent>
          <StaffTable
            data={adminStaffManagementListQuery.data?.data ?? []}
            loading={adminStaffManagementListQuery.isPending}
            onRowClick={onRowClick}
          />
          <Pagination
            currentPage={filterParams.current_page ?? 1}
            totalCount={adminStaffManagementListQuery.data?.meta?.total ?? 1}
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
