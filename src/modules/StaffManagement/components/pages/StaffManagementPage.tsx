import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import StaffTable from '@/modules/StaffManagement/components/tables/StaffTable';
import { StaffManagementService } from '@/modules/StaffManagement/services/staffManagement.service';
import {
  Staff,
  StaffManagementFilterParams
} from '@/modules/StaffManagement/types/staffManagement.types';
import { createDefaultFilterParams } from '@/modules/StaffManagement/utils';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StaffManagementPage = () => {
  const [filterParams, setFilterParams] = useState<StaffManagementFilterParams>(
    createDefaultFilterParams()
  );

  const [staffList, setStaffList] = useState<Staff[]>([]);

  const navigate = useNavigate();

  const adminStaffManagementListQuery = useQuery({
    queryKey: ['admin-staff-management-list', filterParams],
    queryFn: () => StaffManagementService.getStaffList(filterParams)
  });

  useEffect(() => {
    if (adminStaffManagementListQuery.data && adminStaffManagementListQuery.isSuccess) {
      setStaffList(adminStaffManagementListQuery.data.data);
    }
  }, [adminStaffManagementListQuery.data, adminStaffManagementListQuery.isSuccess, filterParams]);

  const onRowClick = (staff: Staff) => {
    navigate(`/staff-management/${staff.id}`);
  };

  const onAddStaffClick = () => {
    navigate('/staff-management/new');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Staff Management</h1>
        <Button variant="outline" onClick={onAddStaffClick}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="mt-4">
          <StaffTable
            data={staffList}
            loading={adminStaffManagementListQuery.isPending}
            onRowClick={onRowClick}
          />
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};
