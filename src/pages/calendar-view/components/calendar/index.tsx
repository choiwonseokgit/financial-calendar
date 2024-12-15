import React from 'react';

import moment from 'moment';
import {
  Calendar as BigCalendar,
  EventPropGetter,
  View,
  momentLocalizer,
} from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LoadingSpinner from '@components/loading-spinner';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
import {
  isScheduleEvent,
  isSpendingEvent,
} from '@utils/calendar-event-type-guard';

import MyDateHeader from './components/my-date-header';
import MyEvent from './components/my-event';
import MyMonthHeader from './components/my-month-header';
import useCalendarEvents from './hooks/use-calendar-events';
import { TFormatCalendarEvents } from './hooks/use-calendar-events';

import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  date: Date | string;
  idx: number;
  view: View;
  onNavigate: (date: Date, idx: number, view: View) => void;
  onChangeView: (view: View) => void;
}

function Calendar({
  date,
  idx,
  view,
  onNavigate,
  onChangeView,
}: CalendarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { calendarEvents: formatSpendingMoneyEvents, isLoading } =
    useCalendarEvents(date);

  const eventPropGetter: EventPropGetter<TFormatCalendarEvents> = (event) => ({
    ...(isSpendingEvent(event) && {
      style: {
        backgroundColor: 'inherit',
        color: 'var(--pink01)',
        fontWeight: 'bold',
      },
    }),
    ...(isScheduleEvent(event) && {
      style: {
        backgroundColor: event.color,
      },
    }),
  });

  const handleSelectEvent = (event: TFormatCalendarEvents) => {
    dispatch(changeTransitionDirection('right'));
    navigate('/spending-detail', { state: event });
  };

  const { spendingMoney: isSpendingMoneyVisible } = useAppSelector(
    (state) => state.calendarOption,
  );

  if (isLoading)
    return (
      <LoadingSpinner height={isSpendingMoneyVisible ? `73dvh` : `88dvh`} />
    );

  return (
    <S.Container $isSpendingMoneyVisible={isSpendingMoneyVisible}>
      <BigCalendar<TFormatCalendarEvents>
        localizer={localizer}
        date={date}
        onNavigate={(date, view) => {
          onNavigate(date, idx, view);
        }}
        view={view}
        onView={onChangeView}
        showAllEvents={true}
        toolbar={false}
        events={formatSpendingMoneyEvents}
        eventPropGetter={eventPropGetter}
        onSelectEvent={handleSelectEvent}
        startAccessor={'startDate'}
        endAccessor={'endDate'}
        components={{
          month: {
            header: MyMonthHeader,
            dateHeader: MyDateHeader,
            event: MyEvent,
          },
        }}
      />
    </S.Container>
  );
}

export default React.memo(Calendar);

const S = {
  Container: styled.section<{ $isSpendingMoneyVisible: boolean }>`
    background-color: white;
    .rbc-calendar {
      height: 88dvh;
      height: ${({ $isSpendingMoneyVisible }) =>
        $isSpendingMoneyVisible ? '73dvh' : '88dvh'};
    }
    .rbc-month-view {
      border: none;
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
        color: var(--red);
      }
      &:last-child {
        color: var(--blue);
      }
    }

    .rbc-today {
      background-color: var(--green02);
    }

    .rbc-button-link.rbc-show-more {
      color: var(--green04);
      position: absolute;
    }
  `,
};
