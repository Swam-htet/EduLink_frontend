import type { TableColumn } from '@/components/common/Table';
import Table from '@/components/common/Table';
import { trimString } from '@/lib/utils';
import { Staff, StaffStatus } from '@/modules/StaffManagement/types/staffManagement.types';
interface StaffTableProps {
  data: Staff[];
  loading?: boolean;
  onRowClick?: (staff: Staff) => void;
}

const StaffTable: React.FC<StaffTableProps> = ({ data, loading, onRowClick }) => {
  const columns: TableColumn<Staff>[] = [
    {
      header: 'No',
      accessor: (staff) => staff.id,
      width: '5%'
    },
    {
      header: 'First Name',
      accessor: (staff) => staff.first_name,
      width: '10%'
    },
    {
      header: 'Last Name',
      accessor: (staff) => staff.last_name,
      width: '10%'
    },
    {
      header: 'Email',
      accessor: (staff) => staff.email,
      width: '10%'
    },
    {
      header: 'Phone',
      accessor: (staff) => staff.phone,
      width: '10%'
    },
    {
      header: 'Gender',
      accessor: (staff) => staff.gender,
      width: '10%'
    },
    {
      header: 'NRC',
      accessor: (staff) => staff.nrc,
      width: '10%'
    },
    {
      header: 'Address',
      accessor: (staff) => trimString(staff.address, 10),
      width: '15%'
    },
    {
      header: 'Jointed Date',
      accessor: (staff) => staff.joined_date,
      width: '10%'
    },
    {
      header: 'Role',
      accessor: (staff) => <span className="text-blue-600">{staff.role}</span>,
      width: '10%'
    },
    {
      header: 'Status',
      accessor: (staff) => (
        <span
          className={`rounded-full px-2 py-1 text-sm ${
            staff.status === StaffStatus.Active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {staff.status}
        </span>
      ),
      width: '0%'
    }
  ];

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      onRowClick={onRowClick}
      emptyMessage="No staff members found"
    />
  );
};

export default StaffTable;
