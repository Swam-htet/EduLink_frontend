import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { ClassManagementService } from '@/modules/ClassManagement/services/classManagement.service';
import { ClassStatus } from '@/modules/ClassManagement/types/class.types';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ChevronLeft, GraduationCap, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const ClassDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { confirm } = useDialog();

  const classQuery = useQuery({
    queryKey: ['class-detail', id],
    queryFn: () => ClassManagementService.getClassById(id as string),
    enabled: !!id
  });

  const handleEdit = () => {
    navigate(`${PRIVATE_ENDPOINTS.CLASS_MANAGEMENT}/${id}/edit`);
  };

  const handleCancel = () => {
    if (!classQuery.data?.data) return;

    confirm({
      title: 'Cancel Class',
      content: `Are you sure you want to cancel the class "${classQuery.data.data.name}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          await ClassManagementService.updateClass(id as string, {
            status: ClassStatus.Cancelled
          });
          toast.success('Class cancelled successfully');
          classQuery.refetch();
        } catch (error) {
          toast.error('Failed to cancel class');
        }
      }
    });
  };

  if (classQuery.isPending) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="flex items-center gap-2">
          <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-r-transparent" />
          <span>Loading class information...</span>
        </div>
      </div>
    );
  }

  if (classQuery.isError || !classQuery.data?.data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Class not found</h2>
          <p className="text-muted-foreground">
            The class you're looking for doesn't exist or you don't have access.
          </p>
        </div>
        <Button onClick={() => navigate(PRIVATE_ENDPOINTS.CLASS_MANAGEMENT)}>
          Back to Class List
        </Button>
      </div>
    );
  }

  const classData = classQuery.data.data;

  const getStatusBadgeClass = (status: ClassStatus) => {
    switch (status) {
      case ClassStatus.Scheduled:
        return 'bg-blue-100 text-blue-800';
      case ClassStatus.Ongoing:
        return 'bg-green-100 text-green-800';
      case ClassStatus.Completed:
        return 'bg-purple-100 text-purple-800';
      case ClassStatus.Cancelled:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(PRIVATE_ENDPOINTS.CLASS_MANAGEMENT)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{classData.name}</h1>
            <p className="text-muted-foreground text-sm">Class Code: {classData.code}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
              classData.status
            )}`}
          >
            {classData.status}
          </span>
          {classData.status !== ClassStatus.Cancelled && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEdit}>
                Edit Class
              </Button>
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
        {/* Class Information */}
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
                <p>{format(new Date(classData.start_date), 'PPP')}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">End Date</h3>
                <p>{format(new Date(classData.end_date), 'PPP')}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Capacity</h3>
                <p>{classData.capacity} students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course and Teacher Information */}
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

      {/* Additional Information Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="students">
            <TabsList>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            <TabsContent value="students" className="mt-4">
              <p className="text-muted-foreground">Student list will be implemented here</p>
            </TabsContent>
            <TabsContent value="schedule" className="mt-4">
              <p className="text-muted-foreground">Class schedule will be implemented here</p>
            </TabsContent>
            <TabsContent value="materials" className="mt-4">
              <p className="text-muted-foreground">Class materials will be implemented here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassDetailPage;
