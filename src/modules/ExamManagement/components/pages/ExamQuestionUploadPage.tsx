import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ExamQuestionUploadForm } from '@/modules/ExamManagement/forms/ExamQuestionUploadForm';
import type { UploadQuestionsFormData } from '@/modules/ExamManagement/schemas/exam.schema';
import { ExamManagementService } from '@/modules/ExamManagement/services/examManagement.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const ExamQuestionUploadPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const examQuery = useQuery({
    queryKey: ['exam', id],
    queryFn: () => ExamManagementService.getExamById(id as string),
    enabled: !!id
  });

  const uploadExamQuestionsMutation = useMutation({
    mutationKey: ['upload-exam-questions'],
    mutationFn: (data: UploadQuestionsFormData) =>
      ExamManagementService.uploadExamQuestions(id as string, data),
    onSuccess: () => {
      toast.success('Questions uploaded successfully');
      navigate(`${PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${id}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload questions');
    }
  });

  const handleSubmit = async (data: UploadQuestionsFormData) => {
    uploadExamQuestionsMutation.mutate(data);
    console.log(
      data.exam_questions.map((question) => {
        return {
          ...question,
          marking_schema: {
            correct: question.marks,
            incorrect: 0
          }
        };
      })
    );
  };

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

  const exam = examQuery.data?.data;

  if (!exam) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>Exam not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`${PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${id}`)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">Upload Questions - {exam.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ExamQuestionUploadForm exam={exam} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};
