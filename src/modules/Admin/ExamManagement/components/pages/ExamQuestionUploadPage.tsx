import BackButton from '@/components/common/BackButtton';
import { LoadingSection } from '@/components/pages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ExamQuestionUploadForm } from '@/modules/Admin/ExamManagement/forms/ExamQuestionUploadForm';
import type { UploadQuestionsFormData } from '@/modules/Admin/ExamManagement/schemas/exam.schema';
import { ExamManagementService } from '@/modules/Admin/ExamManagement/services/examManagement.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const ExamQuestionUploadPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const examQuery = useQuery({
    queryKey: ['exam-management-detail', id],
    queryFn: () => ExamManagementService.getExamById(id as string),
    enabled: !!id
  });

  const uploadExamQuestionsMutation = useMutation({
    mutationKey: ['upload-exam-questions'],
    mutationFn: (data: UploadQuestionsFormData) =>
      ExamManagementService.uploadExamQuestions(id as string, data),
    onSuccess: () => {
      toast.success('Questions uploaded successfully');
      navigate(`${ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT}/${id}`);
      queryClient.invalidateQueries({ queryKey: ['exam', id] });
    },
    onError: () => {
      toast.error('Failed to upload questions');
    }
  });

  const handleSubmit = async (data: UploadQuestionsFormData) => {
    uploadExamQuestionsMutation.mutate(data);
  };

  const exam = examQuery.data?.data;

  if (examQuery.isLoading) {
    return <LoadingSection />;
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
      <div className="flex items-center gap-2">
        <BackButton navigate={navigate} />
        <h1 className="text-xl font-semibold">Upload Questions - {exam.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ExamQuestionUploadForm
            exam={exam}
            onSubmit={handleSubmit}
            loading={uploadExamQuestionsMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};
