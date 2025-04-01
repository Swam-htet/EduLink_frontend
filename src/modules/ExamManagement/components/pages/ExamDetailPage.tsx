import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { cn } from '@/lib/utils';
import { ExamManagementService } from '@/modules/ExamManagement/services/examManagement.service';
import { ExamStatus } from '@/modules/ExamManagement/types/exam.types';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ChevronLeft, Clock, FilePlus, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const getStatusClassName = (status: ExamStatus) => {
  switch (status) {
    case ExamStatus.DRAFT:
      return 'bg-gray-100 text-gray-800';
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

export const ExamDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { confirm, confirmDelete } = useDialog();
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const examQuery = useQuery({
    queryKey: ['exam', id],
    queryFn: () => ExamManagementService.getExamById(id as string),
    enabled: !!id
  });

  const updateExamMutation = useMutation({
    mutationKey: ['update-exam-status'],
    mutationFn: (status: ExamStatus) => ExamManagementService.updateExam(id as string, { status }),
    onSuccess: () => {
      toast.success('Exam status updated successfully');
      examQuery.refetch();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update exam status');
    }
  });

  const handlePublish = () => {
    confirm({
      title: 'Publish Exam',
      content: 'Are you sure you want to publish this exam? Students will be able to see it.',
      confirmText: 'Publish',
      onConfirm: () => {
        updateExamMutation.mutate(ExamStatus.PUBLISHED);
      }
    });
  };

  const handleCancel = () => {
    confirmDelete({
      title: 'Cancel Exam',
      content: 'Are you sure you want to cancel this exam? This action cannot be undone.',
      confirmText: 'Cancel Exam',
      onDelete: () => {
        updateExamMutation.mutate(ExamStatus.CANCELLED);
      }
    });
  };

  const handleAddQuestions = () => {
    navigate(`${PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${id}/upload-questions`);
  };

  const exam = examQuery.data?.data;

  if (examQuery.isPending) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          <span>Loading exam details...</span>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>Exam not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(PRIVATE_ENDPOINTS.EXAM_MANAGEMENT)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">{exam.title}</h1>
        </div>
        <div className="flex gap-2">
          {exam.status === ExamStatus.DRAFT && (
            <>
              <Button onClick={handlePublish} variant="default">
                Publish Exam
              </Button>
              <Button onClick={handleCancel} variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Cancel Exam
              </Button>
            </>
          )}
          {exam.status === ExamStatus.DRAFT && (
            <Button onClick={handleAddQuestions} variant="outline">
              <FilePlus className="mr-2 h-4 w-4" />
              Upload Questions
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Exam Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd>
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                        getStatusClassName(exam.status)
                      )}
                    >
                      {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                    </span>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm whitespace-pre-wrap">
                    {exam.description || 'No description provided'}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Class</dt>
                  <dd className="mt-1 text-sm">{exam.class?.name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Subject</dt>
                  <dd className="mt-1 text-sm">{exam.subject?.title || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4 text-gray-400" />
                    {exam.exam_details.duration} minutes
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Marks</dt>
                  <dd className="mt-1 text-sm">{exam.exam_details.total_marks}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Pass Marks</dt>
                  <dd className="mt-1 text-sm">{exam.exam_details.pass_marks}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="mt-1 text-sm">
                    {exam.schedule.start_date
                      ? format(new Date(exam.schedule.start_date), 'PPp')
                      : 'Not set'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">End Date</dt>
                  <dd className="mt-1 text-sm">
                    {exam.schedule.end_date
                      ? format(new Date(exam.schedule.end_date), 'PPp')
                      : 'Not set'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="mt-1 text-sm">{format(new Date(exam.created_at), 'PPp')}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Updated At</dt>
                  <dd className="mt-1 text-sm">{format(new Date(exam.updated_at), 'PPp')}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Sections</CardTitle>
            </CardHeader>
            <CardContent>
              {exam.sections && exam.sections.length > 0 ? (
                <ul className="space-y-3">
                  {exam.sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={cn(
                          'hover:border-primary w-full rounded-md border p-3 text-left',
                          activeSection === section.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        )}
                        onClick={() =>
                          setActiveSection(activeSection === section.id ? null : section.id)
                        }
                      >
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{section.section_title}</h3>
                          <span className="text-xs">
                            {section.total_questions} Questions | {section.total_marks} Marks
                          </span>
                        </div>
                        {activeSection === section.id && section.section_description && (
                          <p className="mt-2 text-xs text-gray-500">
                            {section.section_description}
                          </p>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No sections defined yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
