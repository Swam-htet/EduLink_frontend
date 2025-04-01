import Table, { TableColumn } from '@/components/common/Table';
import { cn } from '@/lib/utils';
import { ExamStatus, type Exam } from '@/modules/ExamManagement/types/exam.types';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

interface ExamTableProps {
  data: Exam[];
  isLoading: boolean;
  onRowClick: (exam: Exam) => void;
}

export const ExamTable = ({ data, isLoading, onRowClick }: ExamTableProps) => {
  const getStatusClassName = (status: ExamStatus) => {
    switch (status) {
      case ExamStatus.DRAFT:
        return 'bg-yellow-100 text-yellow-800';
      case ExamStatus.PUBLISHED:
        return 'bg-blue-100 text-blue-800';
      case ExamStatus.ONGOING:
        return 'bg-yellow-100 text-yellow-800';
      case ExamStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case ExamStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: TableColumn<Exam>[] = [
    {
      header: 'Title',
      accessor: (exam) => exam.title
    },
    {
      header: 'Class',
      accessor: (exam) => (exam.class ? exam.class.name : '-')
    },
    {
      header: 'Subject',
      accessor: (exam) => (exam.subject ? exam.subject.title : '-')
    },
    {
      header: 'Start Date',
      accessor: (exam) => format(new Date(exam.schedule.start_date), 'PPP')
    },
    {
      header: 'End Date',
      accessor: (exam) => format(new Date(exam.schedule.end_date), 'PPP')
    },
    {
      header: 'Duration',
      accessor: (exam) => `${exam.exam_details.duration} minutes`
    },
    {
      header: 'Total Marks',
      accessor: (exam) => exam.exam_details.total_marks
    },
    {
      header: 'Status',
      accessor: (exam) => (
        <span
          className={cn(
            'inline-flex rounded-full px-2 py-1 text-xs font-medium',
            getStatusClassName(exam.status)
          )}
        >
          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
        </span>
      )
    }
  ];

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );

  if (data.length === 0)
    return (
      <div className="flex items-center justify-center">
        <p className="text-sm text-gray-500">No exams found</p>
      </div>
    );

  return <Table columns={columns} data={data} loading={isLoading} onRowClick={onRowClick} />;
};
