import { Calendar } from '@/components/common/Calendar';
import { Button } from '@/components/ui/button';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';

import { ClassScheduleService } from '@/modules/Admin/ClassScheduleManagement/services/classSchedule.service';
import { ClassSchedule } from '@/modules/Admin/ClassScheduleManagement/types/classSchedule.types';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: ClassSchedule;
}

export const ClassScheduleManagementPage = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);

  const classScheduleQuery = useQuery({
    queryKey: ['class-schedule-management'],
    queryFn: () => ClassScheduleService.getSchedules()
  });

  useEffect(() => {
    if (classScheduleQuery.isSuccess && classScheduleQuery.data) {
      setSchedules(classScheduleQuery.data.data);
    }
  }, [classScheduleQuery.isSuccess, classScheduleQuery.data]);

  const events: CalendarEvent[] = schedules.map((schedule) => ({
    id: schedule.id,
    title: `${schedule.class.name} - ${schedule.subject.title}`,
    start: new Date(schedule.schedule_details.start_date),
    end: new Date(schedule.schedule_details.end_date),
    resource: schedule
  }));

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Class Schedule Calendar</h1>
        <Button onClick={() => navigate(ADMIN_PRIVATE_ENDPOINTS.CLASS_SCHEDULE_CREATE)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Schedule
        </Button>
      </div>
      <Calendar events={events} />
    </div>
  );
};
