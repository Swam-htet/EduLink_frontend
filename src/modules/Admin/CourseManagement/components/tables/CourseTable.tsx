import Table from '@/components/common/Table';
import { Button } from '@/components/ui/button';
import { formatDate, trimString } from '@/lib/utils';
import type { Course } from '@/modules/Admin/CourseManagement/types/course.types';

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
      header: 'Created At',
      accessor: (course: Course) => formatDate(course.created_at)
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
