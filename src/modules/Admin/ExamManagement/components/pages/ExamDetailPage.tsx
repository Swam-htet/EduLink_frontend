import BackButton from '@/components/common/BackButtton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { cn, formatDate } from '@/lib/utils';
import { ExamManagementService } from '@/modules/Admin/ExamManagement/services/examManagement.service';
import {
  BlankAnswer,
  ExamQuestion,
  ExamStatus,
  QuestionOption
} from '@/modules/Admin/ExamManagement/types/exam.types';
import { useDialog } from '@/providers/dialog/useDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  FilePlus,
  Loader2,
  Mail,
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

const QuestionCard = ({ question, index }: { question: ExamQuestion; index: number }) => {
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

      {question.type === 'multiple_choice' && question.options && (
        <div className="mt-2">
          <p className="text-sm font-medium">Options:</p>
          <ul className="mt-1 list-inside list-disc space-y-1">
            {question.options.map((option: QuestionOption) => (
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

      {question.type === 'fill_in_blank' && question.blank_answers && (
        <div className="mt-2">
          <p className="text-sm font-medium">Acceptable Answers:</p>
          <ul className="mt-1 space-y-1">
            {question.blank_answers.map((answer: BlankAnswer) => (
              <li key={answer.id} className="text-muted-foreground text-sm">
                {answer.acceptable_answers.join(', ')}
                {answer.case_sensitive ? ' (Case sensitive)' : ' (Case insensitive)'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {question.type === 'matching' && question.matching_pairs && (
        <div className="mt-2">
          <p className="text-sm font-medium">Matching Pairs:</p>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Questions:</p>
              <ul className="mt-1 space-y-1">
                {question.matching_pairs.questions.map((q) => {
                  const matchingAnswer = question.matching_pairs?.answers.find(
                    (a) => a.id === question.matching_pairs?.correct_pairs[q.id]
                  );
                  return (
                    <li key={q.id} className="text-muted-foreground text-sm">
                      {q.text} → {matchingAnswer?.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      {question.type === 'ordering' && question.correct_order && question.options && (
        <div className="mt-2">
          <p className="text-sm font-medium">Correct Order:</p>
          <ol className="mt-1 list-decimal pl-4">
            {question.correct_order.map((orderId: string | number) => {
              const option = question.options?.find((opt: QuestionOption) => opt.id === orderId);
              return (
                <li key={orderId} className="text-muted-foreground text-sm">
                  {option?.text}
                </li>
              );
            })}
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

  const examResultsQuery = useQuery({
    queryKey: ['exam-results', id],
    queryFn: () => ExamManagementService.getExamResults(id as string),
    enabled: !!id
  });

  const sendExamResultsMutation = useMutation({
    mutationKey: ['send-exam-results'],
    mutationFn: () => ExamManagementService.sendExamResults(id as string),
    onSuccess: () => {
      toast.success('Exam results sent successfully');
    }
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

  const publishExamMutation = useMutation({
    mutationKey: ['publish-exam'],
    mutationFn: () => ExamManagementService.publishExam(id as string),
    onSuccess: () => {
      toast.success('Exam published successfully');
      navigate(ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT);
      queryClient.invalidateQueries({ queryKey: ['exam-management'] });
    }
  });

  // const sendManualPublishMutation = useMutation({
  //   mutationKey: ['send-manual-publish'],
  //   mutationFn: () => ExamManagementService.sendManualPublish(id as string),
  //   onSuccess: () => {
  //     toast.success('Manual publish mail sent successfully');
  //   }
  // });

  const handlePublish = () => {
    confirm({
      title: 'Publish Exam',
      content: 'Are you sure you want to publish this exam? Students will be able to see it.',
      confirmText: 'Publish',
      onConfirm: () => {
        publishExamMutation.mutate();
      }
    });
  };

  // const handleSendManualPublish = () => {
  //   confirm({
  //     title: 'Send Manual Publish',
  //     content: 'Are you sure you want to send manual publish for this exam?',
  //     confirmText: 'Send',
  //     onConfirm: () => {
  //       sendManualPublishMutation.mutate();
  //     }
  //   });
  // };

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

  const handleSendExamResults = () => {
    confirm({
      title: 'Send Exam Results',
      content: 'Are you sure you want to send exam results for this exam?',
      confirmText: 'Send',
      onConfirm: () => {
        sendExamResultsMutation.mutate();
      }
    });
  };

  const handleAddQuestions = () => {
    navigate(`${ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${id}/upload-questions`);
  };

  if (examQuery.isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (examQuery.isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <X className="text-destructive h-8 w-8" />
          <p className="text-muted-foreground">Failed to load exam details</p>
          <Button onClick={() => navigate(ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT)}>
            Back to Exams
          </Button>
        </div>
      </div>
    );
  }

  const examDetails = examQuery.data?.data;

  if (!examDetails) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <X className="text-destructive h-8 w-8" />
          <p className="text-muted-foreground">Exam not found</p>
          <Button onClick={() => navigate(ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT)}>
            Back to Exams
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton navigate={navigate} />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{examDetails.title}</h1>
            <p className="text-muted-foreground text-sm">
              {examDetails.subject?.title || 'No subject specified'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {examDetails.status === ExamStatus.DRAFT && (
            <>
              <Button onClick={handlePublish} variant="default">
                Publish Exam
              </Button>
              <Button onClick={handleCancel} variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Cancel Exam
              </Button>
              <Button onClick={handleAddQuestions} variant="outline">
                <FilePlus className="mr-2 h-4 w-4" />
                Upload Questions
              </Button>
            </>
          )}
          {examDetails.status === ExamStatus.PUBLISHED && (
            <>
              {/* <Button onClick={handleSendManualPublish} variant="default">
                <Mail className="mr-2 h-4 w-4" />
                Send Manual Publish
              </Button> */}
              <Button onClick={handleSendExamResults} variant="default">
                <Mail className="mr-2 h-4 w-4" />
                Send Exam Results
              </Button>
            </>
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
                    <Badge
                      variant="outline"
                      className={cn(
                        'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                        getStatusClassName(examDetails.status)
                      )}
                    >
                      {examDetails.status.charAt(0).toUpperCase() + examDetails.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Class</span>
                  <p className="mt-1 text-sm">{examDetails.class?.name || 'N/A'}</p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Description</span>
                  <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
                    {examDetails.description || 'No description provided'}
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
                    {examDetails.exam_details.duration} minutes
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Total Marks</span>
                  <p className="mt-1 text-sm">{examDetails.exam_details.total_marks}</p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Pass Marks</span>
                  <p className="mt-1 text-sm">{examDetails.exam_details.pass_marks}</p>
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
                    {examDetails.schedule.exam_date
                      ? formatDate(examDetails.schedule.exam_date)
                      : 'Not set'}
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">Start Time</span>
                  <p className="mt-1 text-sm">{examDetails.schedule.start_time || 'Not set'}</p>
                </div>

                <div>
                  <span className="text-muted-foreground text-sm font-medium">End Time</span>
                  <p className="mt-1 text-sm">{examDetails.schedule.end_time || 'Not set'}</p>
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
              {examDetails.sections && examDetails.sections.length > 0 ? (
                <div className="space-y-4">
                  {examDetails.sections.map((section) => (
                    <div key={section.id} className="rounded-lg border">
                      <button
                        className="hover:bg-muted/50 w-full rounded-t-lg p-4 text-left"
                        onClick={() =>
                          setActiveSection(activeSection === section.id ? null : section.id)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium">{section.section_title}</h3>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {section.question_type}
                              </Badge>
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
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground text-sm">No sections defined yet</p>
                  <Button onClick={handleAddQuestions} variant="outline" className="mt-4">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Add Questions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Exam Results</CardTitle>
            </CardHeader>
            <CardContent>
              {examResultsQuery.isPending ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-muted-foreground">Loading results...</span>
                  </div>
                </div>
              ) : examResultsQuery.data?.data.length === 0 ? (
                <div className="flex h-32 items-center justify-center">
                  <p className="text-muted-foreground">No results found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground text-sm font-medium">
                        Total Results
                      </span>
                      <p className="mt-1 text-sm">{examResultsQuery.data?.data.length || 0}</p>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Total Marks</TableHead>
                          <TableHead>Correct Answers</TableHead>
                          <TableHead>Wrong Answers</TableHead>
                          <TableHead>Condition</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {examResultsQuery.data?.data.map((result) => (
                          <TableRow
                            key={result.id}
                            className="hover:bg-muted/50 cursor-pointer"
                            onClick={() =>
                              navigate(
                                `${ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${id}/results/${result.id}/students/${result.student.id}`
                              )
                            }
                          >
                            <TableCell className="font-medium">{result.student.name}</TableCell>
                            <TableCell>{result.total_marks_obtained}</TableCell>
                            <TableCell>{result.correct_answers}</TableCell>
                            <TableCell>{result.wrong_answers}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-xs',
                                  result.condition === 'pass' ? 'text-yellow-600' : 'text-blue-600'
                                )}
                              >
                                {result.condition}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={result.status === 'pass' ? 'default' : 'destructive'}
                                className="text-xs"
                              >
                                {result.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
