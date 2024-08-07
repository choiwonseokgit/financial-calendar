import { useEffect } from 'react';
import { init } from '@store/datesSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeView } from '@store/viewSlice';
import { formatISO } from 'date-fns';
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
// import MyToolbar from './my-toolbar';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  date: Date | string;
  handleFlicking: (view: Partial<View>) => void;
}

function Calendar({ date, handleFlicking }: CalendarProps) {
  const view = useAppSelector((state) => state.view);
  const dispatch = useAppDispatch();

  const handleNavigate = (date: Date) => {
    dispatch(init({ date: formatISO(date), view }));
  };

  const handleOnView = (view: View) => {
    dispatch(changeView(view));
  };

  useEffect(() => {
    handleFlicking(view);
  }, [view]);

  return (
    <S.Container>
      <BigCalendar
        localizer={localizer}
        date={date}
        onNavigate={handleNavigate}
        view={view}
        onView={handleOnView}
        components={{
          toolbar: () => <></>,
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
      height: 70dvh;
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
