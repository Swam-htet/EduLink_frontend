import Table, { TableColumn } from '@/components/common/Table';
import { cn, formatDate } from '@/lib/utils';
import type { Student } from '@/modules/Admin/StudentManagement/types/studentManagement.types';

interface StudentTableProps {
  data: Student[];
  isLoading?: boolean;
  onSelect?: (student: Student, checked: boolean) => void;
  selectedRows?: number[];
  onRowClick?: (student: Student) => void;
  selectable?: boolean;
}

const checkValidation = (student: Student) => {
  return student.status == 'active';
};

export const StudentTable = ({
  data,
  selectable = false,
  isLoading,
  selectedRows,
  onRowClick,
  onSelect
}: StudentTableProps) => {
  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceColor = (attendance: string) => {
    const percentage = parseInt(attendance.split('%')[0]);
    // below 30% is red
    // above 30% is yellow
    // above 70% is green
    if (percentage < 30) {
      return 'red';
    }
    if (percentage > 30 && percentage < 70) {
      return 'orange';
    }
    if (percentage > 70) {
      return 'green';
    }
  };

  const handleSelect = (student: Student, checked: boolean) => {
    onSelect?.(student, checked);
  };

  const columns: TableColumn<Student>[] = [
    {
      header: 'Student ID',
      accessor: (student: Student) => student.student_id
    },
    {
      header: 'Name',
      accessor: (student: Student) => `${student.first_name} ${student.last_name}`
    },
    {
      header: 'Email',
      accessor: (student: Student) => student.email
    },
    {
      header: 'Phone',
      accessor: (student: Student) => student.phone
    },
    {
      header: 'Gender',
      accessor: (student: Student) => <span className="capitalize">{student.gender}</span>
    },
    {
      header: 'Attendance',
      accessor: (student: Student) => (
        <span className="capitalize" style={{ color: getAttendanceColor(student.attendance) }}>
          {student.attendance}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (student: Student) => (
        <span
          className={cn(
            'inline-flex rounded-full px-2 py-1 text-xs font-medium',
            getStatusClassName(student.status)
          )}
        >
          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Created At',
      accessor: (student: Student) => formatDate(student.created_at)
    }
  ];

  return (
    <Table<Student>
      selectable={selectable}
      columns={columns}
      data={data}
      checkValidation={checkValidation}
      loading={isLoading}
      onRowSelect={handleSelect}
      onRowClick={onRowClick}
      selectedRows={selectedRows}
    />
  );
};
