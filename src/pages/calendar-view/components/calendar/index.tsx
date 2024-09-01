import React from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
import {
  isScheduleEvent,
  isSpendingEvent,
} from '@utils/calendar-event-type-guard';
import moment from 'moment';
import {
  Calendar as BigCalendar,
  EventPropGetter,
  View,
  momentLocalizer,
} from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  // TODO: 렌더링 개선하기, 렌더링 많이 일어남
  // console.log('렌더링');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formatSpendingMoneyEvents = useCalendarEvents(date);

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
    // console.log(event);
    dispatch(changeTransitionDirection('next'));
    navigate('/spending-detail', { state: event });
  };

  const { spendingMoney: isSpendingMoneyVisible } = useAppSelector(
    (state) => state.calendarOption,
  );

  // const handleSelectEvent = (event: (typeof EVENTS)[0]) => {
  //   const {
  //     start,
  //     end,
  //     resource: { type },
  //   } = event;
  //   if (start && end) {
  //     if (calDateAndMakeStr(start) !== calDateAndMakeStr(end)) {
  //       const dates = eachDayOfInterval({ start, end }).map((date) =>
  //         calDateAndMakeStr(date),
  //       );
  //       // console.log(start, end);
  //       console.log(dates);
  //     }
  //   }

  //   if (type === 'schedule' && view === 'month') {
  //     onNavigate(event.start, idx, view);
  //     dispatch(select(format(event.start, 'yyyy/MM/dd')));
  //     onChangeView('day');
  //     //TODO: day 뷰에서 선택하면 삭제하거나 편집할 수 있게끔하기
  //   }
  // };

  // useEffect(() => {
  //   onFlicking(view);
  // }, [view]);

  //TODO: useEffect 써서 filtering 하기

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
        // events={view === 'day' ? FILTERED_EVENT : EVENTS}
        events={formatSpendingMoneyEvents}
        eventPropGetter={eventPropGetter}
        onSelectEvent={handleSelectEvent}
        // onShowMore={(dates) => {
        //   console.log(dates);
        //   dispatch(select(format(dates[0].start, 'yyyy/MM/dd')));
        // }}
        // selectable
        // onSelectSlot={({ start, action }) => {
        //   if (action === 'click') {
        //     dispatch(select(format(start, 'yyyyMMdd')));
        //   } else return;
        // }}
        // titleAccessor={'spentMoney'}
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
  Container: styled.div<{ $isSpendingMoneyVisible: boolean }>`
    background-color: white;
    .rbc-calendar {
      height: 88dvh;
      height: ${({ $isSpendingMoneyVisible }) =>
        $isSpendingMoneyVisible ? '73dvh' : '88dvh'};
      /* max-height: 88dvh; */
      max-height: 800px;
    }
    /* .rbc-selected-cell {
      background-color: white;
    } */
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

    .rbc-button-link.rbc-show-more {
      color: var(--green04);
      position: absolute;
    }
  `,
};
