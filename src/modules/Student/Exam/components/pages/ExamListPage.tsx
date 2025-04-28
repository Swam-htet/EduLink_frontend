import CustomCalendar, { CalendarEvent } from '@/components/common/Calendar';
import { Card, CardContent } from '@/components/ui/card';
import { STUDENT_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { goToDynamicRoute } from '@/lib/utils';
import {
  ClassScheduleFilter,
  ClassScheduleFilterFormValues
} from '@/modules/Admin/ClassScheduleManagement/components/forms/ClassScheduleFilter';
import ClassService from '@/modules/Student/Class/services/class.service';
import { ExamService } from '@/modules/Student/Exam/services/exam.service';
import { useQuery } from '@tanstack/react-query';
import { isPast } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ExamListPage = () => {
  const [filterParams, setFilterParams] = useState<ClassScheduleFilterFormValues>({});
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const navigate = useNavigate();

  const examListQuery = useQuery({
    queryKey: ['exam-list'],
    queryFn: () => ExamService.getExamsByClassId(filterParams.class_id ?? ''),
    enabled: !!filterParams.class_id
  });

  const classListQuery = useQuery({
    queryKey: ['class-list'],
    queryFn: () => ClassService.getAllOngoingClassesForStudent()
  });

  useEffect(() => {
    if (examListQuery.data && examListQuery.isSuccess) {
      setEvents(
        examListQuery.data.data.map((exam) => ({
          id: exam.id,
          title: exam.title,
          start: new Date(exam.schedule.exam_date + ' ' + exam.schedule.start_time),
          end: new Date(exam.schedule.exam_date + ' ' + exam.schedule.end_time),
          resource: exam.class.name
        }))
      );
    }
  }, [examListQuery.data, examListQuery.isSuccess]);

  const classes = classListQuery.data?.data.map((classItem) => ({
    id: classItem.id,
    title: classItem.name
  }));

  const handleSelectEvent = (event: CalendarEvent) => {
    const exam = examListQuery.data?.data.find((exam) => exam.id === event.id);
    // if exam date is past, redirect to exam result detail page else redirect to exam form page
    if (isPast(new Date(exam?.schedule.exam_date ?? ''))) {
      navigate(
        goToDynamicRoute(STUDENT_PRIVATE_ENDPOINTS.EXAM_RESULT_DETAIL, exam?.id.toString() ?? '')
      );
    } else {
      navigate(goToDynamicRoute(STUDENT_PRIVATE_ENDPOINTS.EXAM_FORM, exam?.id.toString() ?? ''));
    }
  };

  const handleReset = () => {
    setEvents([]);
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exam List</h1>
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

      <CustomCalendar events={events} onSelectEvent={handleSelectEvent} height={600} />
    </div>
  );
};
