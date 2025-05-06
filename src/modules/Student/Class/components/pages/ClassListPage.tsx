import CustomCalendar, { CalendarEvent } from '@/components/common/Calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  ClassScheduleFilter,
  ClassScheduleFilterFormValues
} from '@/modules/Admin/ClassScheduleManagement/components/forms/ClassScheduleFilter';
import ClassService from '@/modules/Student/Class/services/class.service';
import { ClassSchedule } from '@/modules/Student/Class/types/class.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format, isAfter, isBefore } from 'date-fns';
import { Calendar, Clock, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const isWithinAttendanceWindow = (schedule: ClassSchedule) => {
  const now = new Date();
  const startTime = new Date(schedule.schedule_details.start_date);
  const endTime = new Date(schedule.schedule_details.end_date);

  return isAfter(now, startTime) && isBefore(now, endTime);
};

export const ClassListPage = () => {
  const [filterParams, setFilterParams] = useState<ClassScheduleFilterFormValues>({});
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ClassSchedule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const classScheduleListQuery = useQuery({
    queryKey: ['class-schedule-list'],
    queryFn: () => ClassService.getClassSchedulesByClassId(filterParams.class_id ?? ''),
    enabled: !!filterParams.class_id
  });

  const classListQuery = useQuery({
    queryKey: ['class-list'],
    queryFn: () => ClassService.getAllOngoingClassesForStudent()
  });

  const attendanceMutation = useMutation({
    mutationFn: () => ClassService.makeAttendance(selectedEvent?.id.toString() ?? ''),
    onSuccess: () => {
      toast.success('Attendance made successfully');
      setIsDialogOpen(false);
    }
  });

  useEffect(() => {
    if (classScheduleListQuery.data && classScheduleListQuery.isSuccess) {
      setEvents(
        classScheduleListQuery.data.data.map((classSchedule) => ({
          id: classSchedule.id,
          title: classSchedule.subject.title,
          start: new Date(classSchedule.schedule_details.start_date),
          end: new Date(classSchedule.schedule_details.end_date),
          resource: classSchedule.class.name
        }))
      );
    }
  }, [classScheduleListQuery.data, classScheduleListQuery.isSuccess]);

  const classes = classListQuery.data?.data.map((classItem) => ({
    id: classItem.id,
    title: classItem.name
  }));

  const handleSelectEvent = (event: CalendarEvent) => {
    const classSchedule = classScheduleListQuery.data?.data.find(
      (classSchedule) => classSchedule.id === event.id
    );
    setSelectedEvent(classSchedule ?? null);
    setIsDialogOpen(true);
  };

  const handleMakeAttendance = async () => {
    attendanceMutation.mutate();
  };

  const handleReset = () => {
    setEvents([]);
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Class Schedule</h1>
      </div>

      <Card>
        <CardContent>
          <ClassScheduleFilter
            onReset={handleReset}
            filters={filterParams}
            onFilterChange={setFilterParams}
            classes={classes ?? []}
          />
        </CardContent>
      </Card>

      {/* if class is not selected, show a message */}
      {!filterParams.class_id && (
        <div className="flex items-center justify-start">
          <p className="text-red-500">Please select a class</p>
        </div>
      )}

      <CustomCalendar events={events ?? []} onSelectEvent={handleSelectEvent} height={600} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Class Schedule Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-muted-foreground text-sm">
                    {format(new Date(selectedEvent.schedule_details.start_date), 'PPP')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-muted-foreground text-sm">
                    {format(new Date(selectedEvent.schedule_details.start_date), 'HH:mm')} -{' '}
                    {format(new Date(selectedEvent.schedule_details.end_date), 'HH:mm')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Class</p>
                  <p className="text-muted-foreground text-sm">{selectedEvent.class.name}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Subject</p>
                <p className="text-muted-foreground text-sm">{selectedEvent.subject.title}</p>
              </div>

              {/* {isWithinAttendanceWindow(selectedEvent) && ( */}
              <Button variant="outline" className="w-full" onClick={handleMakeAttendance}>
                Make Class Attendance
              </Button>
              {/* )} */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
