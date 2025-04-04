import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource?: unknown;
}

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

interface CalendarProps {
  events: Event[];
  className?: string;
}

export const Calendar = ({ events, className }: CalendarProps) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-4">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          defaultView="month"
          views={['month', 'week', 'day']}
          eventPropGetter={() => ({
            className: 'bg-primary hover:bg-primary/90 text-primary-foreground',
            style: {
              borderRadius: '4px',
              padding: '2px 4px',
              fontSize: '14px',
              cursor: 'pointer'
            }
          })}
        />
      </CardContent>
    </Card>
  );
};
