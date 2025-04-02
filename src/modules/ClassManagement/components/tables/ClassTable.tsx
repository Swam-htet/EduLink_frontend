import type { TableColumn } from '@/components/common/Table';
import Table from '@/components/common/Table';
import { cn, formatDate } from '@/lib/utils';
import type { Class } from '@/modules/ClassManagement/types/class.types';
import { ClassStatus } from '@/modules/ClassManagement/types/class.types';

interface ClassTableProps {
  data: Class[];
  loading?: boolean;
  onRowClick?: (classItem: Class) => void;
}

const getStatusColor = (status: ClassStatus) => {
  switch (status) {
    case ClassStatus.Scheduled:
      return 'bg-yellow-100 text-yellow-800';
    case ClassStatus.Ongoing:
      return 'bg-green-100 text-green-800';
    case ClassStatus.Completed:
      return 'bg-blue-100 text-blue-800';
    case ClassStatus.Cancelled:
      return 'bg-red-100 text-red-800';
  }
};

const ClassTable: React.FC<ClassTableProps> = ({ data, loading, onRowClick }) => {
  const columns: TableColumn<Class>[] = [
    {
      header: 'No',
      accessor: (classItem) => classItem.id,
      width: '5%'
    },
    {
      header: 'Name',
      accessor: (classItem) => classItem.name,
      width: '15%'
    },
    {
      header: 'Code',
      accessor: (classItem) => classItem.code,
      width: '10%'
    },
    {
      header: 'Teacher',
      accessor: (classItem) =>
        classItem.teacher ? `${classItem.teacher.first_name} ${classItem.teacher.last_name}` : '-',
      width: '15%'
    },
    {
      header: 'Course',
      accessor: (classItem) => classItem.course?.title || '-',
      width: '15%'
    },
    {
      header: 'Capacity',
      accessor: (classItem) => classItem.capacity,
      width: '10%'
    },
    {
      header: 'Duration',
      accessor: (classItem) => (
        <>
          {formatDate(classItem.start_date)} - {formatDate(classItem.end_date)}
        </>
      ),
      width: '20%'
    },
    {
      header: 'Status',
      accessor: (classItem) => (
        <span className={cn('rounded-full px-2 py-1 text-sm', getStatusColor(classItem.status))}>
          {classItem.status}
        </span>
      ),
      width: '10%'
    }
  ];

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      onRowClick={onRowClick}
      emptyMessage="No classes found"
    />
  );
};

export default ClassTable;
