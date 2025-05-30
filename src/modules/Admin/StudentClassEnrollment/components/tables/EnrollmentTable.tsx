import Table, { TableColumn } from '@/components/common/Table';
import { Button } from '@/components/ui/button';
import { cn, formatDate } from '@/lib/utils';
import type { Enrollment } from '@/modules/Admin/StudentClassEnrollment/types/enrollment.types';
import { EnrollmentStatus } from '@/modules/Admin/StudentClassEnrollment/types/enrollment.types';
import React from 'react';
interface EnrollmentTableProps {
  enrollments: Enrollment[];
  onSelect: (enrollment: Enrollment, checked: boolean) => void;
  onUpdateStatus: (enrollment: Enrollment) => void;
  loading: boolean;
}

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

export const EnrollmentTable = ({
  enrollments,
  onSelect,
  onUpdateStatus,
  loading
}: EnrollmentTableProps) => {
  const columns: TableColumn<Enrollment>[] = [
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
      accessor: (row: Enrollment) => formatDate(row.enrolled_at)
    },
    {
      header: 'Created At',
      accessor: (row: Enrollment) => formatDate(row.created_at)
    },
    {
      header: 'Actions',
      accessor: (row: Enrollment) => (
        <React.Fragment>
          {row.status === EnrollmentStatus.ENROLLED && (
            <Button size="sm" onClick={() => onUpdateStatus(row)}>
              Update Status
            </Button>
          )}
        </React.Fragment>
      )
    }
  ];

  return (
    <Table
      checkValidation={(row) => row.status === EnrollmentStatus.ENROLLED}
      columns={columns}
      selectable
      onRowSelect={onSelect}
      data={enrollments}
      loading={loading}
      onRowClick={() => {}}
      emptyMessage="No enrollments found"
    />
  );
};
