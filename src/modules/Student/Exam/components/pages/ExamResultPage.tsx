import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExamAnswer } from '@/modules/Admin/ExamManagement/types/exam.types';
import { ExamService } from '@/modules/Student/Exam/services/exam.service';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Check, Clock, X } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ExamResultPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: result, isLoading } = useQuery({
    queryKey: ['examResult', id],
    queryFn: () => ExamService.getExamResultById(id ?? '')
  });

  const renderAnswerContent = (answer: ExamAnswer) => {
    switch (answer.question.type) {
      case 'multiple_choice':
      case 'true_false':
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium">Selected Answer:</p>
            <p className="text-muted-foreground text-sm">
              {answer.selected_choice
                ? answer.question.options?.find((opt) => opt.id === answer.selected_choice)?.text
                : 'No answer provided'}
            </p>
          </div>
        );

      case 'fill_in_blank':
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Answer:</p>
            <p className="text-muted-foreground text-sm">
              {answer.fill_in_blank_answers?.join(', ') ?? 'No answer provided'}
            </p>
          </div>
        );

      case 'short_answer':
      case 'long_answer':
      case 'essay':
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Answer:</p>
            <p className="text-muted-foreground text-sm">
              {answer.written_answer ?? 'No answer provided'}
            </p>
          </div>
        );

      case 'matching':
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Matches:</p>
            <div className="space-y-1">
              {answer.matching_answers?.map((match, index) => {
                const question = answer.question.matching_pairs?.questions.find(
                  (q) => q.id === match.question
                );
                const answerText = answer.question.matching_pairs?.answers.find(
                  (a) => a.id === match.answer
                );
                return (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{question?.text}</span>
                    <span className="text-muted-foreground">→</span>
                    <span>{answerText?.text}</span>
                  </div>
                );
              }) ?? 'No matches provided'}
            </div>
          </div>
        );

      case 'ordering':
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Order:</p>
            <div className="space-y-1">
              {answer.ordering_answer?.map((itemId, index) => {
                const item = answer.question.options?.find((opt) => opt.id === itemId);
                return (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{item?.text}</span>
                  </div>
                );
              }) ?? 'No order provided'}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Clock className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading exam result...</p>
        </div>
      </div>
    );
  }

  if (!result?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-destructive">Failed to load exam result</p>
        </div>
      </div>
    );
  }

  const examResult = result.data;

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Exam Result</h1>
          <p className="text-muted-foreground text-sm">
            Submitted on {format(new Date(examResult.submitted_at), 'PPP p')}
          </p>
        </div>
        <Badge
          variant={examResult.status === 'pass' ? 'default' : 'destructive'}
          className="text-sm"
        >
          {examResult.status.toUpperCase()}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{examResult.total_marks_obtained}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{examResult.correct_answers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Wrong Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{examResult.wrong_answers}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Answers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {examResult.answers.map((answer) => (
            <div key={answer.id} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{answer.question.question}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {answer.question.type.replace('_', ' ')}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      Marks: {answer.marks_obtained}/{answer.question.marks}
                    </span>
                  </div>
                </div>
                {answer.is_correct ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>

              {renderAnswerContent(answer)}

              {answer.question.explanation && (
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm font-medium">Explanation:</p>
                  <p className="text-muted-foreground text-sm">{answer.question.explanation}</p>
                </div>
              )}

              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
