import React, { useEffect } from 'react';
import { parse } from 'date-fns';
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
import MyEvent from './my-event';
import MyMonthHeader from './my-month-header';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  date: Date | string;
  idx: number;
  view: View;
  onFlicking: (view: View) => void;
  onNavigate: (date: Date, idx: number, view: View) => void;
  onChangeView: (view: View) => void;
}

const EVENTS = [
  {
    title: '26000원',
    start: new Date(),
    end: new Date(),
    resource: 'financial',
  },
  {
    title: '46000원',
    start: parse('20240815', 'yyyyMMdd', new Date()),
    end: parse('20240815', 'yyyyMMdd', new Date()),
    resource: 'financial',
  },
  {
    title: '56000원',
    start: parse('20240801', 'yyyyMMdd', new Date()),
    end: parse('20240801', 'yyyyMMdd', new Date()),
    resource: 'financial',
  },
];

function Calendar({
  date,
  idx,
  view,
  onFlicking,
  onNavigate,
  onChangeView,
}: CalendarProps) {
  // TODO: 렌더링 개선하기, 렌더링 많이 일어남
  // console.log('렌더링');

  useEffect(() => {
    onFlicking(view);
  }, [view]);

  return (
    <S.Container>
      <BigCalendar
        localizer={localizer}
        date={date}
        onNavigate={(date, view) => {
          onNavigate(date, idx, view);
        }}
        view={view}
        onView={onChangeView}
        toolbar={false}
        events={EVENTS}
        // selectable
        // onSelectSlot={({ start, action }) => {
        //   if (action === 'click') {
        //     dispatch(select(format(start, 'yyyyMMdd')));
        //   } else return;
        // }}
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
  Container: styled.div`
    background-color: white;
    .rbc-calendar {
      height: 73dvh;
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

    .rbc-event {
      background-color: var(--green04);
    }
  `,
};
