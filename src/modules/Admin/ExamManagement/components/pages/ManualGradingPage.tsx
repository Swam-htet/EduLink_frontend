import BackButton from '@/components/common/BackButtton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ExamManagementService } from '@/modules/Admin/ExamManagement/services/examManagement.service';
import {
  ExamAnswer,
  ExamResultDetail,
  QuestionType
} from '@/modules/Admin/ExamManagement/types/exam.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Save } from 'lucide-react';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

const gradingSchema = z.object({
  marks: z.number().min(1, 'Marks must be greater than or equal to 1'),
  comments: z.string().min(1, 'Comments are required')
});

type GradingFormValues = z.infer<typeof gradingSchema>;

interface GradingFormProps {
  answer: ExamAnswer;
  onSave: (data: GradingFormValues) => void;
}

const GradingForm: React.FC<GradingFormProps> = ({ answer, onSave }) => {
  const form = useForm<GradingFormValues>({
    resolver: zodResolver(gradingSchema),
    defaultValues: {
      marks: Number(answer.marks_obtained) || 0,
      comments: answer.grading_comments || ''
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = form;

  const onSubmit: SubmitHandler<GradingFormValues> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <Label htmlFor={`marks-${answer.id}`}>Marks</Label>
        <Controller
          name="marks"
          control={control}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                id={`marks-${answer.id}`}
                type="number"
                min={0}
                max={answer.question?.marks ?? 0}
                className="mt-2"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {errors.marks && <p className="mt-1 text-sm text-red-500">{errors.marks.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <Label htmlFor={`comments-${answer.id}`}>Comments</Label>
        <Controller
          name="comments"
          control={control}
          render={({ field }) => (
            <div>
              <Textarea
                {...field}
                id={`comments-${answer.id}`}
                className="mt-2"
                placeholder="Add grading comments..."
              />
              {errors.comments && (
                <p className="mt-1 text-sm text-red-500">{errors.comments.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="col-span-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Grading
        </Button>
      </div>
    </form>
  );
};

export const ManualGradingPage: React.FC = () => {
  const { examId, resultId, studentId } = useParams<{
    examId: string;
    resultId: string;
    studentId: string;
  }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: result,
    isLoading,
    error
  } = useQuery({
    queryKey: ['examResult', examId, resultId, studentId],
    queryFn: () => ExamManagementService.getExamResultDetail(examId, resultId, studentId),
    enabled: Boolean(examId && resultId && studentId)
  });

  const manualGradingMutation = useMutation({
    mutationFn: ({
      answerId,
      marks,
      comments
    }: {
      answerId: string;
      marks: number;
      comments: string;
    }) => ExamManagementService.manualGrading(answerId, resultId, marks, comments),
    onSuccess: () => {
      toast.success('Grading saved successfully');
      queryClient.invalidateQueries({ queryKey: ['examResult', examId, resultId, studentId] });
    },
    onError: () => {
      toast.error('Failed to save grading');
    }
  });

  const handleSaveGrading = (answerId: number, data: GradingFormValues) => {
    manualGradingMutation.mutate({
      answerId: answerId.toString(),
      marks: data.marks,
      comments: data.comments || ''
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !result?.data) {
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

  const data = result.data as ExamResultDetail;
  const manualGradingQuestions =
    data.answers?.filter((answer: ExamAnswer) => answer.question?.requires_manual_grading) ?? [];

  if (manualGradingQuestions.length === 0) {
    return (
      <div className="container mx-auto space-y-6 p-6">
        <BackButton navigate={navigate} />
        <CardTitle className="text-2xl font-bold">Manual Grading</CardTitle>
        <Card>
          <CardContent>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Student Name</p>
                <p className="text-lg font-semibold">{data.student?.name ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="text-lg font-semibold">{data.student?.id ?? 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              No Questions Require Manual Grading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              There are no questions that require manual grading for this exam result.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      <BackButton navigate={navigate} />
      <CardTitle className="text-2xl font-bold">Manual Grading</CardTitle>
      <Card>
        <CardContent>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Student Name</p>
              <p className="text-lg font-semibold">{data.student?.name ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Student ID</p>
              <p className="text-lg font-semibold">{data.student?.id ?? 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Questions Requiring Manual Grading ({manualGradingQuestions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {manualGradingQuestions.map((answer: ExamAnswer) => (
            <div
              key={answer.id}
              className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {answer.question?.question ?? 'N/A'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Maximum Marks: {answer.question?.marks ?? 0}
                </p>
              </div>

              <div className="mb-4 space-y-4">
                <div>
                  <Label className="text-sm font-medium">Student's Answer</Label>
                  <div className="mt-2 rounded bg-gray-50 p-4">
                    {answer.question?.type === QuestionType.SHORT_ANSWER ||
                    answer.question?.type === QuestionType.LONG_ANSWER ||
                    answer.question?.type === QuestionType.ESSAY ? (
                      <p>{answer.written_answer ?? 'No answer provided'}</p>
                    ) : answer.question?.type === QuestionType.FILL_IN_BLANK ? (
                      <p>{answer.fill_in_blank_answers ?? 'No answer provided'}</p>
                    ) : answer.question?.type === QuestionType.MATCHING ? (
                      <div className="space-y-2">
                        {answer.matching_answers?.map((match, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="font-medium">{match.question}</span>
                            <span className="text-gray-500">→</span>
                            <span>{match.answer}</span>
                          </div>
                        )) ?? 'No matching answers provided'}
                      </div>
                    ) : answer.question?.type === QuestionType.ORDERING ? (
                      <div className="space-y-2">
                        {answer.ordering_answer?.map((itemId: string, index: number) => {
                          const item = answer.question?.options?.find((opt) => opt.id === itemId);
                          return (
                            <div key={index} className="flex items-center gap-2">
                              <span className="font-medium">{index + 1}.</span>
                              <span>{item?.text ?? 'N/A'}</span>
                            </div>
                          );
                        }) ?? 'No ordering answer provided'}
                      </div>
                    ) : null}
                  </div>
                </div>

                <GradingForm
                  answer={answer}
                  onSave={(data) => {
                    handleSaveGrading(answer.id, data);
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
