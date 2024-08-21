import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Flicking, { MoveEndEvent } from '@egjs/react-flicking';
import { useAppSelector } from '@store/hooks';
import { holidayApi } from '@store/query/holidaySlice';
import {
  nextDay,
  nextMonth,
  prevDay,
  prevMonth,
} from '@store/selected-date-slice';
import calDateAndMakeStr from '@utils/cal-date-and-make-str';
import { format, formatISO, parse } from 'date-fns';
import { motion } from 'framer-motion';
import { View } from 'react-big-calendar';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Calendar from './components/calendar/index';
import Footer from './components/footer';
import NavBar from './components/nav-bar';
import SideBar from './components/side-bar/index';
import '@egjs/react-flicking/dist/flicking.css';

type Dates = string[];

interface Action {
  type: 'TODAY' | 'PREV' | 'NEXT' | 'INIT';
  idx?: number;
  view?: View;
  date?: string;
}

const reducer = (dates: Dates, action: Action) => {
  switch (action.type) {
    case 'TODAY':
      return [
        calDateAndMakeStr(new Date(), -1),
        calDateAndMakeStr(new Date()),
        calDateAndMakeStr(new Date(), 1),
      ];
    case 'PREV': {
      const { idx, view } = action;

      switch (idx) {
        case 0:
          return [
            dates[0],
            calDateAndMakeStr(dates[0], -2, view),
            calDateAndMakeStr(dates[0], -1, view),
          ];
        case 1:
          return [
            calDateAndMakeStr(dates[1], -1, view),
            dates[1],
            calDateAndMakeStr(dates[1], -2, view),
          ];
        case 2:
          return [
            calDateAndMakeStr(dates[2], -2, view),
            calDateAndMakeStr(dates[2], -1, view),
            dates[2],
          ];
        default:
          return dates;
      }
    }
    case 'NEXT': {
      const { idx, view } = action;

      switch (idx) {
        case 0:
          return [
            dates[0],
            calDateAndMakeStr(dates[0], 1, view),
            calDateAndMakeStr(dates[0], 2, view),
          ];
        case 1:
          return [
            calDateAndMakeStr(dates[1], 2, view),
            dates[1],
            calDateAndMakeStr(dates[1], 1, view),
          ];
        case 2:
          return [
            calDateAndMakeStr(dates[2], 1, view),
            calDateAndMakeStr(dates[2], 2, view),
            dates[2],
          ];
        default:
          return dates;
      }
    }
    case 'INIT': {
      const { date, view, idx } = action;

      if (date)
        switch (idx) {
          case 0:
            return [
              date,
              calDateAndMakeStr(date, 1, view),
              calDateAndMakeStr(date, -1, view),
            ];
          case 1:
            return [
              calDateAndMakeStr(date, -1, view),
              date,
              calDateAndMakeStr(date, 1, view),
            ];
          case 2:
            return [
              calDateAndMakeStr(date, 1, view),
              calDateAndMakeStr(date, -1, view),
              date,
            ];
        }
      return dates;
    }
    default:
      return dates;
  }
};

function CalendarView() {
  const [dates, datesDispatch] = useReducer(reducer, [
    calDateAndMakeStr(new Date(), -1),
    calDateAndMakeStr(new Date()),
    calDateAndMakeStr(new Date(), 1),
  ]);
  const selectedDates = useAppSelector((state) => state.selectedDate);
  const dispatch = useDispatch();
  const [view, setView] = useState<View>('month');
  const [currIdx, setCurrIdx] = useState(1);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const flickingRef = useRef<Flicking>(null);
  const isCanceledRef = useRef(0);

  const handleOnMoveEnd = (e: MoveEndEvent<Flicking>) => {
    const isFlickingCanceled = !!isCanceledRef.current;

    if (isFlickingCanceled) return;

    const idx = e.currentTarget.index;

    if (e.direction === 'PREV') {
      datesDispatch({ type: 'PREV', idx, view });
      dispatch(view === 'month' ? prevMonth() : prevDay());
    } else if (e.direction === 'NEXT') {
      datesDispatch({ type: 'NEXT', idx, view });
      dispatch(view === 'month' ? nextMonth() : nextDay());
    }
  };

  //SideBar
  const handleSideBarBtnClick = useCallback((isOpen: boolean) => {
    setIsSideBarOpen(isOpen);
  }, []);

  //NavBar
  const handleTodayChange = async () => {
    await flickingRef.current?.moveTo(1, 0);
    datesDispatch({ type: 'TODAY' });
  };

  const handleMonthBtnClick = () => {
    handleChangeView('month');
  };

  const handleArrowBtnClick = async (
    direction: 'PREV' | 'NEXT',
    view: View,
  ) => {
    if (flickingRef.current?.animating) return;

    switch (view) {
      case 'month': {
        if (direction === 'PREV') {
          await flickingRef.current?.prev();
        } else if (direction === 'NEXT') {
          await flickingRef.current?.next();
        }
        break;
      }
      case 'day': {
        if (direction === 'PREV') {
          await flickingRef.current?.prev(0);
        } else if (direction === 'NEXT') {
          await flickingRef.current?.next(0);
        }
        break;
      }
    }
  };

  //Calendar
  // const handleFlicking = useCallback((view: Partial<View>) => {
  //   if (view !== 'month') {
  //     console.log('disable');
  //     flickingRef.current?.disableInput();
  //   } else {
  //     console.log('enable');
  //     flickingRef.current?.enableInput();
  //   }
  // }, []);

  const handleNavigate = useCallback((date: Date, idx: number, view: View) => {
    const dateStr = formatISO(date);
    datesDispatch({ type: 'INIT', idx, date: dateStr, view });
  }, []);

  const handleChangeView = useCallback(
    (view: View) => {
      setView(view);
    },
    [setView],
  );

  //useEffect
  const [trigger] = holidayApi.endpoints.getHoliday.useLazyQuery();

  const holidayQueries = dates.map((date) => {
    const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
    return () => trigger({ year: year, month: month }, true).unwrap();
  });

  //공휴일 api fetch
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        await Promise.all(holidayQueries.map((query) => query()));
      } catch (err) {
        console.error(err);
      }
    };

    fetchHolidays();
  }, [dates]);

  //view change
  useEffect(() => {
    if (view === 'month') {
      flickingRef.current?.enableInput();
    } else {
      flickingRef.current?.disableInput();
    }
  }, [view]);

  //초기화
  useEffect(() => {
    const currSelectDate = calDateAndMakeStr(
      parse(selectedDates, 'yyyy/MM/dd', new Date()),
    );
    datesDispatch({ type: 'INIT', date: currSelectDate, idx: 1, view: view });
  }, []);

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{
        duration: 0.3,
        delay: 0,
      }}
    >
      <NavBar
        date={dates[currIdx]}
        view={view}
        onTodayChange={handleTodayChange}
        onMonthBtnClick={handleMonthBtnClick}
        onArrowBtnClick={handleArrowBtnClick}
        onSideBarBtnClick={handleSideBarBtnClick}
      />
      {isSideBarOpen && <SideBar onSideBarBtnClick={handleSideBarBtnClick} />}
      <S.Main>
        <Flicking
          ref={flickingRef}
          preventDefaultOnDrag={false}
          preventEventsBeforeInit={true}
          renderOnlyVisible={false}
          circular={true}
          duration={300}
          defaultIndex={1}
          interruptable={true}
          onMoveEnd={handleOnMoveEnd}
          onChanged={(e) => setCurrIdx(e.index)}
          moveType={['strict', { count: 1 }]}
          changeOnHold={true} //범인?
          threshold={50}
          inputType={['touch', 'mouse']}
          onWillRestore={() => (isCanceledRef.current = 1)}
          onWillChange={() => (isCanceledRef.current = 0)}
        >
          {dates.map((date, idx) => (
            <S.Section key={idx}>
              <Calendar
                date={date}
                idx={idx}
                view={view}
                // onFlicking={handleFlicking}
                onNavigate={handleNavigate}
                onChangeView={handleChangeView}
              />
            </S.Section>
          ))}
        </Flicking>
      </S.Main>
      <Footer date={dates[currIdx]} />
    </motion.div>
  );
}

export default CalendarView;

const S = {
  Main: styled.main`
    width: 100%;
  `,
  Section: styled.section`
    width: 100%;
  `,
};
