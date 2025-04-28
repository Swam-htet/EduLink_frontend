import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Event, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Initialize localizer
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS }
});

// Event type definition
export interface CalendarEvent extends Event {
  id: number | string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: string;
}

// CustomCalendar props interface
interface CustomCalendarProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date; slots: Date[] }) => void;
  defaultView?: View;
  height?: string | number;
}

export default function CustomCalendar({
  events,
  onSelectEvent,
  onSelectSlot,
  defaultView = 'month',
  height = '600px'
}: CustomCalendarProps) {
  const [view, setView] = useState<View>(defaultView);
  const [date, setDate] = useState<Date>(new Date());

  const handleSelectEvent = (event: CalendarEvent) => {
    onSelectEvent?.(event);
    setView('day');
    setDate(event.start);
  };

  return (
    <BigCalendar<CalendarEvent>
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{
        width: '100%',
        height: height
      }}
      className="custom-calendar"
      views={['month', 'week', 'day']}
      defaultView={defaultView}
      view={view}
      onView={setView}
      date={date}
      onNavigate={setDate}
      onSelectEvent={handleSelectEvent}
      selectable={!!onSelectSlot}
      onSelectSlot={onSelectSlot || (() => {})}
      step={15}
      popup
      popupOffset={{ x: -10, y: 0 }}
      showAllEvents={false}
    />
  );
}
