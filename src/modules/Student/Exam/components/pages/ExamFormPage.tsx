import { ExamForm } from '@/modules/Student/Exam/components/forms/ExamForm';
import ExamService from '@/modules/Student/Exam/services/exam.service';
import { ExamAnswer, ExamQuestionResponse } from '@/modules/Student/Exam/types/exam.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export function ExamFormPage() {
  const { id } = useParams<{ id: string }>();

  const examFormDataQuery = useQuery<ExamQuestionResponse>({
    queryKey: ['exam-by-id', id],
    queryFn: () => ExamService.getExamById(id as string),
    enabled: !!id
  });

  const examFormSubmitMutation = useMutation({
    mutationFn: (answers: ExamAnswer[]) => ExamService.submitExam(id as string, answers),
    onSuccess: () => {
      toast.success('Exam submitted successfully');
    },
    onError: () => {
      toast.error('Failed to submit exam');
    }
  });

  const examData = examFormDataQuery.data?.data;

  const handleSubmit = (answers: ExamAnswer[]) => {
    examFormSubmitMutation.mutate(answers);
  };

  if (examFormDataQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (examFormDataQuery.error || !examData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-2xl font-bold text-red-500">
          Cannot access exam data before exam start time or after exam end time
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ExamForm
        examData={examData}
        onSubmit={handleSubmit}
        submitting={examFormSubmitMutation.isPending}
      />
    </div>
  );
}
