import Table from '@/components/common/Table';
import { Button } from '@/components/ui/button';
import { formatDate, trimString } from '@/lib/utils';
import type { Subject } from '@/modules/Admin/SubjectManagement/types/subject.types';

interface SubjectTableProps {
  data: Subject[];
  isLoading: boolean;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
}

export const SubjectTable = ({ data, isLoading, onEdit, onDelete }: SubjectTableProps) => {
  const columns = [
    {
      header: 'Title',
      accessor: (subject: Subject) => subject.title
    },
    {
      header: 'Code',
      accessor: (subject: Subject) => subject.code
    },
    {
      header: 'Description',
      accessor: (subject: Subject) => trimString(subject.description)
    },
    {
      header: 'Credits',
      accessor: (subject: Subject) => subject.credits
    },
    {
      header: 'Course',
      accessor: (subject: Subject) => subject.course?.title || 'N/A'
    },
    {
      header: 'Created At',
      accessor: (subject: Subject) => formatDate(subject.created_at)
    },
    {
      header: 'Actions',
      accessor: (subject: Subject) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(subject)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(subject)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return <Table columns={columns} data={data} loading={isLoading} />;
};
