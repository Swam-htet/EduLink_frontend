import Table from '@/components/common/Table';
import { Button } from '@/components/ui/button';
import { cn, trimString } from '@/lib/utils';
import type { Course } from '@/modules/CourseManagement/types/course.types';
import { format } from 'date-fns';

interface CourseTableProps {
  data: Course[];
  isLoading: boolean;
  onRowClick: (course: Course) => void;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export const CourseTable = ({
  data,
  isLoading,
  onRowClick,
  onEdit,
  onDelete
}: CourseTableProps) => {
  const columns = [
    {
      header: 'Title',
      accessor: (course: Course) => course.title
    },
    {
      header: 'Code',
      accessor: (course: Course) => course.code
    },
    {
      header: 'Description',
      accessor: (course: Course) => trimString(course.description)
    },
    {
      header: 'Duration in months',
      accessor: (course: Course) => course.duration
    },
    {
      header: 'Status',
      accessor: (course: Course) => (
        <span
          className={cn(
            'inline-flex rounded-full px-2 py-1 text-xs font-medium',
            course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
        >
          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
        </span>
      )
    },

    {
      header: 'Created At',
      accessor: (course: Course) => format(new Date(course.created_at), 'PPP')
    },
    {
      header: 'Actions',
      accessor: (course: Course) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(course)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(course)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return <Table columns={columns} data={data} loading={isLoading} onRowClick={onRowClick} />;
};
