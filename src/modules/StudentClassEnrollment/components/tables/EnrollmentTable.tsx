import Table, { TableColumn } from '@/components/common/Table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Enrollment } from '@/modules/StudentClassEnrollment/types/enrollment.types';
import { EnrollmentStatus } from '@/modules/StudentClassEnrollment/types/enrollment.types';
import { format } from 'date-fns';
import React from 'react';
interface EnrollmentTableProps {
  enrollments: Enrollment[];
  selectedEnrollments: number[];
  onUpdateStatus: (enrollment: Enrollment) => void;
  handleSelect: (enrollment: Enrollment, checked: boolean) => void;
  loading: boolean;
}

export const EnrollmentTable = ({
  enrollments,
  selectedEnrollments,
  onUpdateStatus,
  handleSelect,
  loading
}: EnrollmentTableProps) => {
  const getStatusClassName = (status: EnrollmentStatus) => {
    switch (status) {
      case EnrollmentStatus.ENROLLED:
        return 'bg-yellow-100 text-yellow-800';
      case EnrollmentStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case EnrollmentStatus.FAILED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: TableColumn<Enrollment>[] = [
    {
      header: '',
      accessor: (row: Enrollment) => (
        <Checkbox
          disabled={row.status === EnrollmentStatus.COMPLETED}
          checked={selectedEnrollments.includes(row.id)}
          onCheckedChange={(checked) => handleSelect(row, checked as boolean)}
        />
      ),
      width: '50px'
    },
    {
      header: 'Student ID',
      accessor: (row: Enrollment) => row.student.student_id
    },
    {
      header: 'Student Name',
      accessor: (row: Enrollment) => `${row.student.first_name} ${row.student.last_name}`
    },
    {
      header: 'Class',
      accessor: (row: Enrollment) => row.class.name
    },
    {
      header: 'Status',
      accessor: (row: Enrollment) => (
        <span
          className={cn(
            'inline-flex rounded-full px-2 py-1 text-xs font-medium',
            getStatusClassName(row.status)
          )}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Enrolled Date',
      accessor: (row: Enrollment) => format(new Date(row.enrolled_at), 'PPP')
    },
    {
      header: 'Actions',
      accessor: (row: Enrollment) => (
        <React.Fragment>
          {row.status === EnrollmentStatus.ENROLLED && (
            <Button variant="outline" size="sm" onClick={() => onUpdateStatus(row)}>
              Update Status
            </Button>
          )}
        </React.Fragment>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      data={enrollments}
      loading={loading}
      onRowClick={() => {}}
      emptyMessage="No enrollments found"
    />
  );
};
