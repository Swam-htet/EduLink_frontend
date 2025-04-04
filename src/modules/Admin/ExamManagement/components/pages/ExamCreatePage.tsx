import BackButton from '@/components/common/BackButtton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ClassManagementService } from '@/modules/Admin/ClassManagement/services/classManagement.service';
import { Class } from '@/modules/Admin/ClassManagement/types/class.types';
import { ExamCreateForm } from '@/modules/Admin/ExamManagement/forms/ExamCreateForm';
import { CreateExamFormData } from '@/modules/Admin/ExamManagement/schemas/exam.schema';
import { ExamManagementService } from '@/modules/Admin/ExamManagement/services/examManagement.service';
import { SubjectManagementService } from '@/modules/Admin/SubjectManagement/services/SubjectManagement.service';
import { Subject } from '@/modules/Admin/SubjectManagement/types/subject.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ExamCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const classQuery = useQuery({
    queryKey: ['classes'],
    queryFn: () => ClassManagementService.getClasses()
  });

  const subjectQuery = useQuery({
    queryKey: ['subjects'],
    queryFn: () => SubjectManagementService.getSubjects()
  });

  const createExamMutation = useMutation({
    mutationKey: ['create-exam'],
    mutationFn: (data: CreateExamFormData) => ExamManagementService.createExam(data),
    onSuccess: (data) => {
      toast.success(data.message || 'Exam created successfully');
      navigate(ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT);
      queryClient.invalidateQueries({ queryKey: ['exam-management'] });
    },
    onError: () => {
      toast.error('Failed to create exam');
    }
  });

  const classOptions =
    classQuery.data?.data.map((cls: Class) => ({
      value: cls.id.toString(),
      label: cls.name
    })) || [];

  const subjectOptions =
    subjectQuery.data?.data.map((subject: Subject) => ({
      value: subject.id.toString(),
      label: subject.title
    })) || [];

  const handleSubmit = (data: CreateExamFormData) => {
    createExamMutation.mutate(data);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <BackButton navigate={navigate} />
        <h1 className="text-xl font-semibold">Create New Exam</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ExamCreateForm
            onSubmit={handleSubmit}
            isPending={createExamMutation.isPending}
            onCancel={() => navigate(ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT)}
            classOptions={classOptions}
            subjectOptions={subjectOptions}
          />
        </CardContent>
      </Card>
    </div>
  );
};
