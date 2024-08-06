import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import {
  Calendar as BigCalendar,
  View,
  momentLocalizer,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import MyDateHeader from './my-date-header';
import MyMonthHeader from './my-month-header';
import MyToolbar from './my-toolbar';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  date: Date;
  handleFlicking: (onView: Partial<View>) => void;
}

function Calendar({ date, handleFlicking }: CalendarProps) {
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

  useEffect(() => {
    handleFlicking(onView);
  }, [onView, handleFlicking]);

  return (
    <S.Container>
      <BigCalendar
        localizer={localizer}
        date={onView === 'month' ? date : navigateDate}
        onNavigate={handleNavigate}
        view={onView}
        onView={handleOnView}
        components={{
          toolbar: MyToolbar,
          month: {
            header: MyMonthHeader,
            dateHeader: MyDateHeader,
          },
        }}
      />
    </S.Container>
  );
}

export default Calendar;

const S = {
  Container: styled.div`
    .rbc-calendar {
      height: 100dvh;
      /* height: 500px; */
    }
    .rbc-label {
      /* color: #5ca08f; */
    }
    .rbc-month-view {
      border: none;
    }

    .rbc-month-row {
      /* border-top: none; */
    }

    .rbc-day-bg {
      border-left: none;
    }

    .rbc-off-range-bg {
      background: none;
    }
    .rbc-off-range {
      opacity: 0.5;
    }
    .rbc-date-cell {
      padding-right: 0;
      text-align: center;
    }
    .rbc-header {
      background-color: #f5f8f7;
      background-color: var(--green03);
      border-left: none;
      border-bottom: none;
    }

    .rbc-date-cell {
      &:first-child {
        color: red;
      }
      &:last-child {
        color: blue;
      }
    }

    .rbc-today {
      background-color: var(--green02);
    }
  `,
};
