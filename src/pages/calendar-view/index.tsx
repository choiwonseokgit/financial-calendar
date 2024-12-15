import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

import Flicking, { MoveEndEvent } from '@egjs/react-flicking';
import { formatISO, parse } from 'date-fns';
import { motion } from 'framer-motion';
import { View } from 'react-big-calendar';
import styled from 'styled-components';

import usePageTransition from '@hooks/use-page-transition';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  nextDay,
  nextMonth,
  prevDay,
  prevMonth,
} from '@store/slices/selected-date-slice';
import calDateAndMakeStr from '@utils/cal-date-and-make-str';

import Calendar from './components/calendar/index';
import Footer from './components/footer';
import NavBar from './components/nav-bar';
import SideBar from './components/side-bar/index';
import '@egjs/react-flicking/dist/flicking.css';

type TCalendarDates = string[];

interface Action {
  type: 'today' | 'prev' | 'next' | 'init';
  idx?: number;
  view?: View;
  date?: string;
}

const reducer = (calendarDates: TCalendarDates, action: Action) => {
  switch (action.type) {
    case 'today':
      return Array.from(
        { length: 3 },
        (_, i) => calDateAndMakeStr(new Date(), i - 1), // 1번 idx가 기준
      );

    case 'prev': {
      switch (action.idx) {
        case 0:
          return [
            calendarDates[0],
            calDateAndMakeStr(calendarDates[0], -2),
            calDateAndMakeStr(calendarDates[0], -1),
          ];
        case 1:
          return [
            calDateAndMakeStr(calendarDates[1], -1),
            calendarDates[1],
            calDateAndMakeStr(calendarDates[1], -2),
          ];
        case 2:
          return [
            calDateAndMakeStr(calendarDates[2], -2),
            calDateAndMakeStr(calendarDates[2], -1),
            calendarDates[2],
          ];
        default:
          return calendarDates;
      }
    }
    case 'next': {
      switch (action.idx) {
        case 0:
          return [
            calendarDates[0],
            calDateAndMakeStr(calendarDates[0], 1),
            calDateAndMakeStr(calendarDates[0], 2),
          ];
        case 1:
          return [
            calDateAndMakeStr(calendarDates[1], 2),
            calendarDates[1],
            calDateAndMakeStr(calendarDates[1], 1),
          ];
        case 2:
          return [
            calDateAndMakeStr(calendarDates[2], 1),
            calDateAndMakeStr(calendarDates[2], 2),
            calendarDates[2],
          ];
        default:
          return calendarDates;
      }
    }
    case 'init': {
      const { date, idx } = action;

      if (date)
        switch (idx) {
          case 0:
            return [
              date,
              calDateAndMakeStr(date, 1),
              calDateAndMakeStr(date, -1),
            ];
          case 1:
            return [
              calDateAndMakeStr(date, -1),
              date,
              calDateAndMakeStr(date, 1),
            ];
          case 2:
            return [
              calDateAndMakeStr(date, 1),
              calDateAndMakeStr(date, -1),
              date,
            ];
        }
      return calendarDates;
    }
    default:
      return calendarDates;
  }
};

function CalendarView() {
  const [calendarDates, calendarDatesDispatch] = useReducer(
    reducer,
    Array.from({ length: 3 }, (_, i) => calDateAndMakeStr(new Date(), i - 1)),
  );
  const selectedDates = useAppSelector((state) => state.selectedDate);
  const dispatch = useAppDispatch();
  const [view, setView] = useState<View>('month');
  const [currIdx, setCurrIdx] = useState(1);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const flickingRef = useRef<Flicking>(null);
  const isCanceledRef = useRef(0);
  const pageTransition = usePageTransition();

  const handleOnMoveEnd = (e: MoveEndEvent<Flicking>) => {
    const isFlickingCanceled = !!isCanceledRef.current;

    if (isFlickingCanceled) return;

    const idx = e.currentTarget.index;

    if (e.direction === 'PREV') {
      calendarDatesDispatch({ type: 'prev', idx });
      dispatch(view === 'month' ? prevMonth() : prevDay());
    } else if (e.direction === 'NEXT') {
      calendarDatesDispatch({ type: 'next', idx });
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
    calendarDatesDispatch({ type: 'today' });
  };

  const handleMonthBtnClick = () => {
    handleChangeView('month');
  };

  const handleArrowBtnClick = async (
    direction: 'prev' | 'next',
    view: View,
  ) => {
    if (flickingRef.current?.animating) return;

    switch (view) {
      case 'month': {
        if (direction === 'prev') {
          await flickingRef.current?.prev();
        } else if (direction === 'next') {
          await flickingRef.current?.next();
        }
        break;
      }
      case 'day': {
        if (direction === 'prev') {
          await flickingRef.current?.prev(0);
        } else if (direction === 'next') {
          await flickingRef.current?.next(0);
        }
        break;
      }
    }
  };

  const handleCalendarDatesInit = (newDate: string) => {
    calendarDatesDispatch({
      type: 'init',
      date: newDate,
      idx: currIdx,
      view: view,
    });
  };

  const handleNavigate = useCallback((date: Date, idx: number, view: View) => {
    const dateStr = formatISO(date);
    calendarDatesDispatch({ type: 'init', idx, date: dateStr, view });
  }, []);

  const handleChangeView = useCallback(
    (view: View) => {
      setView(view);
    },
    [setView],
  );

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
    calendarDatesDispatch({
      type: 'init',
      date: currSelectDate,
      idx: 1,
      view: view,
    });
  }, []);

  return (
    <motion.div {...pageTransition}>
      <NavBar
        date={calendarDates[currIdx]}
        view={view}
        onTodayChange={handleTodayChange}
        onMonthBtnClick={handleMonthBtnClick}
        onArrowBtnClick={handleArrowBtnClick}
        onSideBarBtnClick={handleSideBarBtnClick}
        onCalendarDatesInit={handleCalendarDatesInit}
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
          changeOnHold={true}
          threshold={50}
          inputType={['touch', 'mouse']}
          onWillRestore={() => (isCanceledRef.current = 1)}
          onWillChange={() => (isCanceledRef.current = 0)}
        >
          {calendarDates.map((date, idx) => (
            <S.Section key={idx}>
              <Calendar
                date={date}
                idx={idx}
                view={view}
                onNavigate={handleNavigate}
                onChangeView={handleChangeView}
              />
            </S.Section>
          ))}
        </Flicking>
      </S.Main>
      <Footer date={calendarDates[currIdx]} />
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
