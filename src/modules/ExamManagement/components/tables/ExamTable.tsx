import Table, { TableColumn } from '@/components/common/Table';
import { cn, formatDate } from '@/lib/utils';
import { ExamStatus, type Exam } from '@/modules/ExamManagement/types/exam.types';

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
      header: 'Exam Date',
      accessor: (exam) => formatDate(exam.schedule.exam_date)
    },
    {
      header: 'Start Time',
      accessor: (exam) => exam.schedule.start_time
    },
    {
      header: 'End Time',
      accessor: (exam) => exam.schedule.end_time
    },
    {
      header: 'Duration (Minutes)',
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
          {exam.status}
        </span>
      )
    }
  ];

  return <Table columns={columns} data={data} loading={isLoading} onRowClick={onRowClick} />;
};
