import { useCallback, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import {
  Calendar as BigCalendar,
  View,
  momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  date: Date;
}

function Calendar({ date }: CalendarProps) {
  const [navigateDate, setNavigateDate] = useState(new Date());
  const [onView, setOnView] = useState<View>('month');

  const handleNavigate = useCallback(
    (date: Date) => {
      setNavigateDate(date);
    },
    [setNavigateDate],
  );

  const handleOnView = useCallback(
    (view: View) => {
      setOnView(view);
    },
    [setOnView],
  );

  return (
    <BigCalendar
      localizer={localizer}
      style={{ height: 500 }}
      date={onView === 'month' ? date : navigateDate}
      onNavigate={handleNavigate}
      onView={handleOnView}
    />
  );
}

export default Calendar;
