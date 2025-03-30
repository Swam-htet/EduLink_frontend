import Table from '@/components/common/Table';
import { Button } from '@/components/ui/button';
import { cn, trimString } from '@/lib/utils';
import type { Subject } from '@/modules/SubjectManagement/types/subject.types';
import { format } from 'date-fns';

interface SubjectTableProps {
  data: Subject[];
  isLoading: boolean;
  onRowClick: (subject: Subject) => void;
  onEdit: (subject: Subject) => void;
}

export const SubjectTable = ({ data, isLoading, onRowClick, onEdit }: SubjectTableProps) => {
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
      header: 'Status',
      accessor: (subject: Subject) => (
        <span
          className={cn(
            'inline-flex rounded-full px-2 py-1 text-xs font-medium',
            subject.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
        >
          {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Created At',
      accessor: (subject: Subject) => format(new Date(subject.created_at), 'PPP')
    },
    {
      header: 'Actions',
      accessor: (subject: Subject) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(subject)}>
            Edit
          </Button>
        </div>
      )
    }
  ];

  return <Table columns={columns} data={data} loading={isLoading} onRowClick={onRowClick} />;
};
