/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { init } from '@store/datesSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { holidayApi, useGetHolidayQuery } from '@store/query/holidaySlice';
import { changeView } from '@store/viewSlice';
import { formatISO, format, addMonths } from 'date-fns';
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
  handleFlicking: (view: Partial<View>) => void;
  type: string;
}

const EVENTS = [
  {
    title: '휴가',
    start: new Date(),
    end: new Date(),
    resource: '광복절',
  },
];

function Calendar({ date, handleFlicking, type }: CalendarProps) {
  const view = useAppSelector((state) => state.view);
  const dispatch = useAppDispatch();

  //TODO: 렌더링 개선하기, 렌더링 많이 일어남
  //console.log('렌더링');

  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];

  const cachedData = useAppSelector((state) =>
    holidayApi.endpoints.getHoliday.select({ year, month })(state),
  );

  const [trigger] = holidayApi.endpoints.getHoliday.useLazyQuery();
  // const { data } = useGetHolidayQuery(
  //   {
  //     year: format(date, 'yyyy'),
  //     month: format(date, 'MM'),
  //   },
  //   {
  //     // 캐시된 데이터를 재사용하도록 설정
  //     refetchOnMountOrArgChange: false,
  //     // 5분 동안 데이터 유지
  //   },
  // );
  //console.log(data);

  const handleNavigate = (date: Date) => {
    dispatch(init({ date: formatISO(date), view }));
  };

  const handleOnView = (view: View) => {
    dispatch(changeView(view));
  };

  useEffect(() => {
    handleFlicking(view);
  }, [view]);

  useEffect(() => {
    if (!cachedData.data && cachedData.data !== '') {
      // console.log('발생');
      trigger(
        {
          year: format(date, 'yyyy'),
          month: format(date, 'MM'),
        },
        true,
      );
    }
  }, [year, month, cachedData.data, trigger]);

  return (
    <S.Container>
      <BigCalendar
        localizer={localizer}
        date={date}
        onNavigate={handleNavigate}
        view={view}
        onView={handleOnView}
        toolbar={false}
        events={EVENTS}
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
