import BackButton from '@/components/common/BackButtton';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ClassManagementService } from '@/modules/Admin/ClassManagement/services/classManagement.service';
import { ClassScheduleForm } from '@/modules/Admin/ClassScheduleManagement/components/forms/ClassScheduleForm';
import { CreateClassScheduleFormData } from '@/modules/Admin/ClassScheduleManagement/schemas/classSchedule.schema';
import { ClassScheduleService } from '@/modules/Admin/ClassScheduleManagement/services/classSchedule.service';
import StaffManagementService from '@/modules/Admin/StaffManagement/services/staffManagement.service';
import { SubjectManagementService } from '@/modules/Admin/SubjectManagement/services/SubjectManagement.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ClassScheduleCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: classes = { data: [] } } = useQuery({
    queryKey: ['classes'],
    queryFn: () => ClassManagementService.getClasses()
  });

  const { data: subjects = { data: [] } } = useQuery({
    queryKey: ['subject-management'],
    queryFn: () => SubjectManagementService.getSubjects()
  });

  const { data: staff = { data: [] } } = useQuery({
    queryKey: ['staff-management'],
    queryFn: () => StaffManagementService.getStaffList({})
  });

  const createScheduleMutation = useMutation({
    mutationFn: (data: CreateClassScheduleFormData) => {
      // Transform the data to match the API expected format
      const transformedData = {
        schedules: data.schedules.map((schedule) => ({
          ...schedule,
          class_id: data.class_id,
          subject_id: data.subject_id,
          staff_id: data.staff_id
        }))
      };
      return ClassScheduleService.createSchedules(transformedData);
    },
    onSuccess: () => {
      toast.success('Class schedules created successfully');
      queryClient.invalidateQueries({ queryKey: ['class-schedule-management'] });
      navigate(ADMIN_PRIVATE_ENDPOINTS.CLASS_SCHEDULE_MANAGEMENT);
    },
    onError: () => {
      toast.error('Failed to create class schedules');
    }
  });

  const onSubmit = (data: CreateClassScheduleFormData) => {
    createScheduleMutation.mutate(data);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-start gap-4">
        <BackButton navigate={navigate} />
        <div>
          <h1 className="text-2xl font-semibold">Create Class Schedules</h1>
          <p className="text-muted-foreground">Add multiple class schedules at once</p>
        </div>
      </div>

      <ClassScheduleForm
        classes={classes.data}
        subjects={subjects.data}
        staff={staff.data}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ClassScheduleCreatePage;
