import BackButton from '@/components/common/BackButtton';
import Table, { TableColumn } from '@/components/common/Table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDate, formatTime } from '@/lib/utils';
import { StudentTable } from '@/modules/Admin/ClassManagement/components/tables/StudentTable';
import { ClassUpdateFormData } from '@/modules/Admin/ClassManagement/schemas/class.schema';
import { ClassManagementService } from '@/modules/Admin/ClassManagement/services/classManagement.service';
import { ClassStatus, Schedule } from '@/modules/Admin/ClassManagement/types/class.types';
import { Subject } from '@/modules/Admin/SubjectManagement/types/subject.types';
import { useDialog } from '@/providers/dialog/useDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BookOpen, Calendar, Clock, GraduationCap, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const getStatusColor = (status: ClassStatus) => {
  switch (status) {
    case ClassStatus.Scheduled:
      return 'bg-yellow-100 text-yellow-800';
    case ClassStatus.Ongoing:
      return 'bg-green-100 text-green-800';
    case ClassStatus.Completed:
      return 'bg-blue-100 text-blue-800';
    case ClassStatus.Cancelled:
      return 'bg-red-100 text-red-800';
  }
};

const SubjectCards = ({ subjects }: { subjects: Subject[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject) => (
        <Card key={subject.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {subject.title}
            </CardTitle>
            <CardDescription>Code: {subject.code}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">{subject.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Credits: {subject.credits}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ScheduleTable = ({ schedules }: { schedules: Schedule[] }) => {
  const columns: TableColumn<Schedule>[] = [
    {
      header: 'Subject',
      accessor: (schedule) => (
        <div className="flex items-center gap-2">
          <BookOpen className="text-muted-foreground h-4 w-4" />
          <span>{schedule.subject.title || '-'}</span>
        </div>
      ),
      width: '20%'
    },
    {
      header: 'Tutor',
      accessor: (schedule) => (
        <div className="flex items-center gap-2">
          <Users className="text-muted-foreground h-4 w-4" />
          <span>{`${schedule.tutor.first_name} ${schedule.tutor.last_name}`}</span>
        </div>
      ),
      width: '20%'
    },
    {
      header: 'Date',
      accessor: (schedule) => (
        <div className="flex items-center gap-2">
          <Calendar className="text-muted-foreground h-4 w-4" />
          <span>{formatDate(schedule.schedule_details.start_date)}</span>
        </div>
      ),
      width: '20%'
    },

    {
      header: 'Time',
      accessor: (schedule) => (
        <div className="flex items-center gap-2">
          <Clock className="text-muted-foreground h-4 w-4" />
          <span>{formatTime(schedule.schedule_details.start_date)}</span>
          <span>-</span>
          <span>{formatTime(schedule.schedule_details.end_date)}</span>
        </div>
      ),
      width: '30%'
    },
    {
      header: 'Late Minutes',
      accessor: (schedule) => (
        <div className="flex items-center gap-2">
          <Clock className="text-muted-foreground h-4 w-4" />
          <span>{schedule.schedule_details.late_mins} mins</span>
        </div>
      ),
      width: '20%'
    }
  ];

  return (
    <Table
      columns={columns}
      data={schedules}
      loading={false}
      emptyMessage="No schedules available"
    />
  );
};

export const ClassDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { confirm } = useDialog();
  const queryClient = useQueryClient();

  const classDetailQuery = useQuery({
    queryKey: ['class-management-detail', id],
    queryFn: () => ClassManagementService.getClassById(id as string),
    enabled: !!id
  });

  const classEditMutation = useMutation({
    mutationFn: (data: ClassUpdateFormData) =>
      ClassManagementService.updateClass(id as string, data),
    onSuccess: () => {
      toast.success('Class updated successfully');
      classDetailQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ['class-management'] });
    },
    onError: () => {
      toast.error('Failed to update class');
    }
  });

  // const handleEdit = () => {
  //   navigate(`${PRIVATE_ENDPOINTS.CLASS_MANAGEMENT}/${id}/edit`);
  // };

  const handleCancel = () => {
    confirm({
      title: 'Are you sure you want to cancel this class?',
      onConfirm: () => {
        classEditMutation.mutate({
          status: ClassStatus.Cancelled
        });
      }
    });
  };

  const handleOnGoing = () => {
    confirm({
      title: 'Are you sure you want to start this class?',
      onConfirm: () => {
        classEditMutation.mutate({
          status: ClassStatus.Ongoing
        });
      }
    });
  };

  if (classDetailQuery.isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const classData = classDetailQuery.data?.data;

  if (!classData) return <div>Class not found</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton navigate={navigate} />
          <div>
            <h1 className="text-xl font-semibold">{classData.name}</h1>
            <p className="text-muted-foreground text-sm">Class Code: {classData.code}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
              classData.status
            )}`}
          >
            {classData.status}
          </span>
          {classData.status === ClassStatus.Scheduled && (
            <Button variant="outline" onClick={handleOnGoing}>
              Start Class
            </Button>
          )}
          {classData.status !== ClassStatus.Cancelled && (
            <div className="flex gap-2">
              {/* <Button variant="outline" onClick={handleEdit}>
                Edit Class
              </Button> */}
              {classData.status === ClassStatus.Scheduled && (
                <Button variant="destructive" onClick={handleCancel}>
                  Cancel Class
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
            <CardDescription>Details about the class</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">Description</h3>
              <p className="mt-1">{classData.description}</p>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Start Date</h3>
                <p>{formatDate(classData.start_date)}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">End Date</h3>
                <p>{formatDate(classData.end_date)}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Capacity</h3>
                <p>{classData.capacity} students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Information</CardTitle>
            <CardDescription>Course and teacher details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">Course</h3>
              <div className="mt-1 flex items-center gap-2">
                <GraduationCap className="text-muted-foreground h-4 w-4" />
                <p>{classData.course?.title || 'Not assigned'}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">Teacher</h3>
              <div className="mt-1 flex items-center gap-2">
                <Users className="text-muted-foreground h-4 w-4" />
                <p>
                  {classData.teacher
                    ? `${classData.teacher.first_name} ${classData.teacher.last_name}`
                    : 'Not assigned'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="students">
            <TabsList>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            <TabsContent value="students" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Students ({classData.students?.length})</h3>
                </div>
                <StudentTable data={classData.students || []} />
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Class Schedule</h3>
                </div>
                {classData.schedules && classData.schedules.length > 0 ? (
                  <ScheduleTable schedules={classData.schedules} />
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-muted-foreground">No schedule available</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="materials" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Subjects ({classData.subjects?.length})</h3>
                </div>
                <SubjectCards subjects={classData.subjects || []} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassDetailPage;
