import React from 'react';
import { eachDayOfInterval, format, parse } from 'date-fns';
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
import calDateAndMakeStr from '@utils/cal-date-and-make-str';
import { useAppDispatch } from '@store/hooks';
import { select } from '@store/selected-date-slice';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  date: Date | string;
  idx: number;
  view: View;
  // onFlicking: (view: View) => void;
  onNavigate: (date: Date, idx: number, view: View) => void;
  onChangeView: (view: View) => void;
}

const EVENTS = [
  {
    title: '26000',
    start: new Date(),
    end: new Date(),
    resource: {
      type: 'financial',
    },
  },
  {
    title: '46000',
    start: parse('20240815', 'yyyyMMdd', new Date()),
    end: parse('20240815', 'yyyyMMdd', new Date()),
    resource: {
      type: 'financial',
    },
  },
  {
    title: '56000',
    start: parse('20240801', 'yyyyMMdd', new Date()),
    end: parse('20240801', 'yyyyMMdd', new Date()),
    resource: {
      type: 'financial',
    },
  },
  {
    title: '캠핑',
    start: parse('20240813', 'yyyyMMdd', new Date()),
    end: parse('20240815', 'yyyyMMdd', new Date()),
    resource: {
      type: 'schedule',
      color: 'blue',
    },
  },
  {
    title: '2800',
    start: parse('20240820', 'yyyyMMdd', new Date()),
    end: parse('20240820', 'yyyyMMdd', new Date()),
    resource: {
      type: 'financial',
    },
  },
  {
    title: '공부 하기',
    start: parse('20240820', 'yyyyMMdd', new Date()),
    end: parse('20240820', 'yyyyMMdd', new Date()),
    resource: {
      type: 'schedule',
      color: 'red',
    },
  },
  {
    title: '영화 보기',
    start: parse('20240820', 'yyyyMMdd', new Date()),
    end: parse('20240820', 'yyyyMMdd', new Date()),
    resource: {
      type: 'schedule',
      color: 'purple',
    },
  },
  {
    title: '공부 하기',
    start: parse('20240820', 'yyyyMMdd', new Date()),
    end: parse('20240820', 'yyyyMMdd', new Date()),
    resource: {
      type: 'schedule',
      color: 'red',
    },
  },
  {
    title: '영화 보기',
    start: parse('20240820', 'yyyyMMdd', new Date()),
    end: parse('20240820', 'yyyyMMdd', new Date()),
    resource: {
      type: 'schedule',
      color: 'purple',
    },
  },
  {
    title: '개발 하기',
    start: new Date('2024-08-01T15:00:00.000Z'),
    end: new Date('2024-08-01T20:00:00.000Z'),
    allDay: false,
    resource: {
      type: 'schedule',
      color: 'purple',
    },
  },
];

const FILTERED_EVENT = EVENTS.filter((e) => e.resource.type === 'schedule');

function Calendar({
  date,
  idx,
  view,
  onNavigate,
  onChangeView,
}: CalendarProps) {
  // TODO: 렌더링 개선하기, 렌더링 많이 일어남
  // console.log('렌더링');
  const dispatch = useAppDispatch();

  const handleSelectEvent = (event: (typeof EVENTS)[0]) => {
    const {
      start,
      end,
      resource: { type },
    } = event;
    if (start && end) {
      if (calDateAndMakeStr(start) !== calDateAndMakeStr(end)) {
        const dates = eachDayOfInterval({ start, end }).map((date) =>
          calDateAndMakeStr(date),
        );
        // console.log(start, end);
        console.log(dates);
      }
    }

    if (type === 'schedule' && view === 'month') {
      onNavigate(event.start, idx, view);
      dispatch(select(format(event.start, 'yyyy/MM/dd')));
      onChangeView('day');
      //TODO: day 뷰에서 선택하면 삭제하거나 편집할 수 있게끔하기
    }
  };

  // useEffect(() => {
  //   onFlicking(view);
  // }, [view]);

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
        showAllEvents={true}
        toolbar={false}
        events={view === 'day' ? FILTERED_EVENT : EVENTS}
        onSelectEvent={handleSelectEvent}
        onShowMore={(dates) => {
          //console.log(dates);
          dispatch(select(format(dates[0].start, 'yyyy/MM/dd')));
        }}
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

    .rbc-button-link.rbc-show-more {
      color: var(--green04);
      position: absolute;
    }
  `,
};
