import BackButton from '@/components/common/BackButtton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { cn, formatDate } from '@/lib/utils';
import { ExamManagementService } from '@/modules/Admin/ExamManagement/services/examManagement.service';
import { ExamStatus } from '@/modules/Admin/ExamManagement/types/exam.types';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  FilePlus,
  Timer,
  X
} from 'lucide-react';
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

const QuestionCard = ({ question, index }: { question: any; index: number }) => {
  return (
    <div className="bg-card mt-4 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">Question {index + 1}</h4>
          <p className="text-muted-foreground mt-1 text-sm">{question.question}</p>
        </div>
        <span className="text-muted-foreground text-sm">{question.marks} marks</span>
      </div>

      {question.explanation && (
        <div className="mt-2">
          <p className="text-sm font-medium">Explanation:</p>
          <p className="text-muted-foreground text-sm">{question.explanation}</p>
        </div>
      )}

      {question.answer_guidelines && (
        <div className="mt-2">
          <p className="text-sm font-medium">Answer Guidelines:</p>
          <p className="text-muted-foreground text-sm">{question.answer_guidelines}</p>
        </div>
      )}

      {question.type === 'multiple_choice' && (
        <div className="mt-2">
          <p className="text-sm font-medium">Options:</p>
          <ul className="mt-1 list-inside list-disc space-y-1">
            {question.options.map((option: any) => (
              <li
                key={option.id}
                className={cn(
                  'text-sm',
                  option.id === question.correct_answer
                    ? 'font-medium text-green-600'
                    : 'text-muted-foreground'
                )}
              >
                {option.text}
                {option.id === question.correct_answer && ' (Correct)'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {question.type === 'true_false' && (
        <div className="mt-2">
          <p className="text-sm font-medium">Correct Answer:</p>
          <p className="text-sm font-medium text-green-600 capitalize">{question.correct_answer}</p>
        </div>
      )}

      {question.type === 'fill_in_blank' && (
        <div className="mt-2">
          <p className="text-sm font-medium">Acceptable Answers:</p>
          <ul className="mt-1 space-y-1">
            {question.blank_answers.map((answer: any) => (
              <li key={answer.id} className="text-muted-foreground text-sm">
                {answer.acceptable_answers.join(', ')}
                {answer.case_sensitive ? ' (Case sensitive)' : ' (Case insensitive)'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {question.type === 'matching' && (
        <div className="mt-2">
          <p className="text-sm font-medium">Matching Pairs:</p>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Questions:</p>
              <ul className="mt-1 space-y-1">
                {question.matching_pairs.questions.map((q: any) => (
                  <li key={q.id} className="text-muted-foreground text-sm">
                    {q.text} →{' '}
                    {
                      question.matching_pairs.answers.find(
                        (a: any) => a.id === question.matching_pairs.correct_pairs[q.id]
                      )?.text
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {question.type === 'ordering' && (
        <div className="mt-2">
          <p className="text-sm font-medium">Correct Order:</p>
          <ol className="mt-1 list-decimal pl-4">
            {question.correct_order.map((orderId: string) => (
              <li key={orderId} className="text-muted-foreground text-sm">
                {question.options.find((opt: any) => opt.id === orderId)?.text}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export const ExamDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
      navigate(ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT);
      queryClient.invalidateQueries({ queryKey: ['exam', id] });
    },
    onError: () => {
      toast.error('Failed to update exam status');
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
    navigate(`${ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${id}/upload-questions`);
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
          <BackButton navigate={navigate} />
          <h1 className="text-2xl font-semibold">{exam.title}</h1>
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

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Exam Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground text-sm font-medium">Status</span>
                  <div className="mt-1">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                        getStatusClassName(exam.status)
                      )}
                    >
                      {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Class</span>
                  <p className="mt-1 text-sm">{exam.class?.name || 'N/A'}</p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Subject</span>
                  <p className="mt-1 text-sm">{exam.subject?.title || 'N/A'}</p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Description</span>
                  <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
                    {exam.description || 'No description provided'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Exam Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground text-sm font-medium">Duration</span>
                  <p className="mt-1 flex items-center text-sm">
                    <Clock className="text-muted-foreground mr-1 h-4 w-4" />
                    {exam.exam_details.duration} minutes
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Total Marks</span>
                  <p className="mt-1 text-sm">{exam.exam_details.total_marks}</p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Pass Marks</span>
                  <p className="mt-1 text-sm">{exam.exam_details.pass_marks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground text-sm font-medium">Exam Date</span>
                  <p className="mt-1 text-sm">
                    {exam.schedule.exam_date ? formatDate(exam.schedule.exam_date) : 'Not set'}
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Start Time</span>
                  <p className="mt-1 text-sm">{exam.schedule.start_time || 'Not set'}</p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">End Time</span>
                  <p className="mt-1 text-sm">{exam.schedule.end_time || 'Not set'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Exam Sections</CardTitle>
            </CardHeader>
            <CardContent>
              {exam.sections && exam.sections.length > 0 ? (
                <div className="space-y-4">
                  {exam.sections.map((section) => (
                    <div key={section.id} className="rounded-lg border">
                      <button
                        className={'w-full rounded-t-lg p-4 text-left'}
                        onClick={() =>
                          setActiveSection(activeSection === section.id ? null : section.id)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium">{section.section_title}</h3>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-muted-foreground text-sm">
                                {section.question_type}
                              </span>
                              <span className="text-muted-foreground text-sm">•</span>
                              <span className="text-muted-foreground text-sm">
                                {section.total_questions} Questions
                              </span>
                              <span className="text-muted-foreground text-sm">•</span>
                              <span className="text-muted-foreground text-sm">
                                {section.total_marks} Marks
                              </span>
                            </div>
                          </div>
                          {activeSection === section.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                        {activeSection === section.id && section.section_description && (
                          <p className="text-muted-foreground mt-2 text-sm">
                            {section.section_description}
                          </p>
                        )}
                      </button>
                      {activeSection === section.id &&
                        section.questions &&
                        section.questions.length > 0 && (
                          <div className="border-t p-4">
                            {section.questions.map((question, index) => (
                              <QuestionCard key={question.id} question={question} index={index} />
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No sections defined yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
