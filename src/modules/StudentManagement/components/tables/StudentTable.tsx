import Table, { TableColumn } from '@/components/common/Table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Student } from '@/modules/StudentManagement/types/studentManagement.types';
import { StudentStatus } from '@/modules/StudentRegistration/types/student.types';
import { format } from 'date-fns';

interface StudentWithSelected extends Student {
  selected: boolean;
}

interface StudentTableProps {
  data: StudentWithSelected[];
  isLoading: boolean;
  onRowClick?: (student: Student) => void;
  onApprove: (student: Student) => void;
  onReject: (student: Student) => void;
  onSelect: (student: StudentWithSelected, checked: boolean) => void;
}

export const StudentTable = ({
  data,
  isLoading,
  onRowClick,
  onApprove,
  onReject,
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

  const handleSelect = (student: StudentWithSelected, checked: boolean) => {
    onSelect(student, checked);
  };

  const columns: TableColumn<StudentWithSelected>[] = [
    {
      header: '',
      accessor: (student: StudentWithSelected) => (
        <Checkbox
          disabled={student.status !== StudentStatus.ACTIVE}
          checked={student.selected}
          onCheckedChange={(checked) => handleSelect(student, checked as boolean)}
        />
      ),
      width: '50px'
    },
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
      accessor: (student: Student) => format(new Date(student.created_at), 'PPP')
    },
    {
      header: 'Actions',
      accessor: (student: Student) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onRowClick?.(student)}>
            View
          </Button>
          {student.status === 'pending' && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove(student);
                }}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onReject(student);
                }}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  return <Table columns={columns} data={data} loading={isLoading} onRowClick={() => {}} />;
};
