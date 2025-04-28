import CustomCalendar, { CalendarEvent } from '@/components/common/Calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import ClassManagementService from '@/modules/Admin/ClassManagement/services/classManagement.service';
import {
  ClassScheduleFilter,
  ClassScheduleFilterFormValues
} from '@/modules/Admin/ClassScheduleManagement/components/forms/ClassScheduleFilter';
import { ClassScheduleService } from '@/modules/Admin/ClassScheduleManagement/services/classSchedule.service';
import { CalendarEventClassSchedule } from '@/modules/Admin/ClassScheduleManagement/types/classSchedule.types';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ClassScheduleManagementPage = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<CalendarEvent[]>([]);
  const [filterParams, setFilterParams] = useState<ClassScheduleFilterFormValues>({});

  const handleFilterChange = (values: ClassScheduleFilterFormValues) => {
    setFilterParams(values);
  };

  const classScheduleQuery = useQuery({
    queryKey: ['class-schedule-management', filterParams],
    queryFn: () => ClassScheduleService.getSchedules(filterParams),
    enabled: !!filterParams.class_id
  });

  const classQuery = useQuery({
    queryKey: ['class-management'],
    queryFn: () => ClassManagementService.getAllOngoingClasses()
  });

  const classes = classQuery.data?.data;

  useEffect(() => {
    if (classScheduleQuery.isSuccess && classScheduleQuery.data) {
      setSchedules(
        classScheduleQuery.data.data.map((schedule: CalendarEventClassSchedule) => ({
          id: schedule.id,
          title: `${schedule.class.name} - ${schedule.subject.title}`,
          start: new Date(schedule.schedule_details.start_date),
          end: new Date(schedule.schedule_details.end_date),
          resource: schedule.class.name,
          status: schedule.status
        }))
      );
    }
  }, [classScheduleQuery.isSuccess, classScheduleQuery.data]);

  const handleReset = () => {
    setSchedules([]);
  };

  const handleSelectEvent = (event: CalendarEvent) => {};

  return (
    <div className="container mx-auto flex flex-col gap-6 p-2">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Class Schedule Calendar</h1>
        <Button onClick={() => navigate(ADMIN_PRIVATE_ENDPOINTS.CLASS_SCHEDULE_CREATE)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Schedule
        </Button>
      </div>
      <Card>
        <CardContent>
          <ClassScheduleFilter
            onReset={handleReset}
            filters={filterParams}
            onFilterChange={handleFilterChange}
            classes={
              classes?.map((classItem) => ({
                id: classItem.id,
                title: classItem.name
              })) ?? []
            }
          />
        </CardContent>
      </Card>
      {/* if class is not selected, show a message */}
      {!filterParams.class_id && (
        <div className="flex items-center justify-start">
          <p className="text-red-500">Please select a class</p>
        </div>
      )}
      <CustomCalendar events={schedules} onSelectEvent={handleSelectEvent} />
    </div>
  );
};
