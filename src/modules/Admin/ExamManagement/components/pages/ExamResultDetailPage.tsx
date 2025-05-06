import BackButton from '@/components/common/BackButtton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ExamManagementService } from '@/modules/Admin/ExamManagement/services/examManagement.service';
import { ExamAnswer, QuestionType } from '@/modules/Admin/ExamManagement/types/exam.types';
import { useQuery } from '@tanstack/react-query';
import { Check, Loader2, X } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ExamResultDetailPage: React.FC = () => {
  const { examId, resultId, studentId } = useParams<{
    examId: string;
    resultId: string;
    studentId: string;
  }>();
  const navigate = useNavigate();

  const {
    data: result,
    isLoading,
    error
  } = useQuery({
    queryKey: ['examResult', examId, resultId, studentId],
    queryFn: () => ExamManagementService.getExamResultDetail(examId, resultId, studentId),
    enabled: Boolean(examId && resultId && studentId)
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded border p-4">
          <p className="text-red-500">
            {error instanceof Error ? error.message : 'Failed to load exam result'}
          </p>
        </div>
      </div>
    );
  }

  const data = result?.data;

  const handleManualGrading = () => {
    if (examId && resultId && studentId) {
      navigate(
        `${ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${examId}/results/${resultId}/students/${studentId}/manual-grading`
      );
    }
  };

  const renderAnswer = (answer: ExamAnswer) => {
    const { question } = answer;

    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Selected Answer:</p>
            {question.options?.map((opt) => (
              <div key={opt.id} className="flex items-center gap-2">
                <div
                  className={`size-4 rounded-full border ${
                    answer.selected_choice === opt.id
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}
                />
                <span className={answer.selected_choice === opt.id ? 'font-medium' : ''}>
                  {opt.text}
                </span>
              </div>
            ))}
          </div>
        );

      case QuestionType.TRUE_FALSE:
        return (
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Selected Answer:</p>
            <div className="flex items-center gap-2">
              <div
                className={`size-4 rounded-full border ${
                  answer.selected_choice === 'true'
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}
              />
              <span className={answer.selected_choice === 'true' ? 'font-medium' : ''}>True</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`size-4 rounded-full border ${
                  answer.selected_choice === 'false'
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}
              />
              <span className={answer.selected_choice === 'false' ? 'font-medium' : ''}>False</span>
            </div>
          </div>
        );

      case QuestionType.FILL_IN_BLANK:
        return (
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Answer:</p>
            <p className="rounded bg-gray-50 p-2">
              {answer.fill_in_blank_answers || 'Not answered'}
            </p>
          </div>
        );

      case QuestionType.SHORT_ANSWER:
      case QuestionType.LONG_ANSWER:
      case QuestionType.ESSAY:
        return (
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Answer:</p>
            <p className="rounded bg-gray-50 p-2">{answer.written_answer || 'Not answered'}</p>
          </div>
        );

      case QuestionType.MATCHING:
        return (
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Matching Answers:</p>
            {answer.matching_answers?.map((match, index) => (
              <div key={index} className="flex items-center gap-2 rounded bg-gray-50 p-2">
                <span className="font-medium">{match.question}</span>
                <span className="text-gray-500">→</span>
                <span>{match.answer}</span>
              </div>
            )) || <p className="rounded bg-gray-50 p-2">Not answered</p>}
          </div>
        );

      case QuestionType.ORDERING:
        return (
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Ordered Items:</p>
            {answer.ordering_answer?.map((itemId, index) => {
              const item = question.options?.find((opt) => opt.id === itemId);
              return (
                <div key={index} className="flex items-center gap-2 rounded bg-gray-50 p-2">
                  <span className="font-medium">{index + 1}.</span>
                  <span>{item?.text}</span>
                </div>
              );
            }) || <p className="rounded bg-gray-50 p-2">Not answered</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <BackButton navigate={navigate} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Exam Result Details</CardTitle>
          {/* {data.condition === 'auto-generated' && ( */}
          <Button onClick={handleManualGrading} variant="default">
            Go to Manual Grading
          </Button>
          {/* )} */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Student Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-lg font-semibold">{data.student.name}</p>
                  <p className="text-gray-600">ID: {data.student.id}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Exam Status</h3>
                <div className="mt-2">
                  <Badge
                    variant={data.status === 'pass' ? 'default' : 'destructive'}
                    className="text-lg"
                  >
                    {data.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Submission Time</h3>
                <p className="mt-2 text-gray-600">{new Date(data.submitted_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Performance Summary</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Total Marks</p>
                    <p className="text-2xl font-bold">{data.total_marks_obtained}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Correct Answers</p>
                    <p className="text-2xl font-bold">
                      {data.correct_answers} / {data.total_questions}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Wrong Answers</p>
                    <p className="text-2xl font-bold">{data.wrong_answers}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="text-2xl font-bold">{data.condition}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Question Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.answers.map((answer) => (
            <div
              key={answer.id}
              className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {answer.question.question}
                  </h3>
                  {answer.question.requires_manual_grading && (
                    <Badge variant="secondary" className="mt-1">
                      Requires Manual Grading
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${answer.is_correct ? 'bg-green-500' : 'bg-red-500'}`}>
                    {answer.is_correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Marks: {answer.marks_obtained} / {answer.question.marks}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {renderAnswer(answer)}
                {answer.question.explanation && (
                  <div className="mt-4 rounded-lg bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-700">Explanation:</p>
                    <p className="mt-1 text-sm text-blue-600">{answer.question.explanation}</p>
                  </div>
                )}
                {answer.question.requires_manual_grading && answer.marks_obtained === '0.00' && (
                  <div className="mt-4 rounded-lg bg-yellow-50 p-4">
                    <p className="text-sm font-medium text-yellow-700">Manual Grading Required</p>
                    <p className="mt-1 text-sm text-yellow-600">
                      This question requires manual review and grading.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
