import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Flicking, { MoveEndEvent } from '@egjs/react-flicking';
import { prev, next, init } from '@store/datesSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { View } from 'react-big-calendar';
import Calendar from './components/calendar';
import '@egjs/react-flicking/dist/flicking.css';
//import { addMonths, format } from 'date-fns';
//import { holidayApi } from '@store/query/holidaySlice';

//import publicHolidayRequest from '@api/open-data/public-holiday';
//TODO: 서버사이드 렌더링으로 데이터 받아오는거 적용해보기

enum Nav {
  prev = 0,
  curr = 1,
  next = 2,
}

function CalendarView() {
  const { dates, view } = useAppSelector((state) => ({
    dates: state.dates,
    view: state.view,
  }));
  const dispatch = useAppDispatch();
  //const [currIdx, setCurrIdx] = useState(1); //idx 안쓸수도
  const [isFlicking, setIsFlicking] = useState(false);
  const flickingRef = useRef<Flicking>(null);
  const isCanceledRef = useRef(0);
  const flickingPosRef = useRef(600);

  //const [trigger] = holidayApi.endpoints.getHoliday.useLazyQuery();

  // const initHolidayQueries = dates.map((date) => {
  //   const year = format(date, 'yyyy');
  //   const month = format(date, 'MM');
  //   const [trigger] = holidayApi.endpoints.getHoliday.useLazyQuery();
  //   return () => trigger({ year: year, month: month }).unwrap();
  // });

  const handleOnMoveEnd = (e: MoveEndEvent<Flicking>) => {
    const isFlickingCanceled = !!isCanceledRef.current;

    if (isFlickingCanceled || !e.axesEvent.isTrusted) return;

    const direction = flickingPosRef.current > 600 ? 'NEXT' : 'PREV';

    if (direction === 'PREV') {
      dispatch(prev());
      // const newPrev = addMonths(dates[0], -1);
      // trigger(
      //   {
      //     year: format(newPrev, 'yyyy'),
      //     month: format(newPrev, 'MM'),
      //   },
      //   true,
      // );
    } else if (direction === 'NEXT') {
      dispatch(next());
      // const newNext = addMonths(dates[2], 1);
      // trigger(
      //   {
      //     year: format(newNext, 'yyyy'),
      //     month: format(newNext, 'MM'),
      //   },
      //   true,
      // );
    }

    setIsFlicking(true);
  };

  const handleFlicking = (view: Partial<View>) => {
    if (view !== 'month') {
      flickingRef.current?.disableInput();
    } else {
      flickingRef.current?.enableInput();
    }
  };

  const moveToInit = async () => {
    await flickingRef.current
      ?.moveTo(Nav.curr, 0)
      .catch((err) => console.error(err));
  };

  // useEffect(() => {
  //   console.log('실행');

  //   const initHolidayData = async () =>
  //     await Promise.all(initHolidayQueries.map((query) => query()));

  //   try {
  //     initHolidayData();
  //   } catch (err) {
  //     console.error('Failed to fetch holiday data:', err);
  //   }
  // }, []);

  useLayoutEffect(() => {
    if (isFlicking) {
      moveToInit();
    }
  }, [isFlicking]);

  useEffect(() => {
    if (isFlicking) {
      dispatch(init({ date: dates[Nav.curr], view }));
      setIsFlicking(false);
    }
  }, [isFlicking]);

  // const data = publicHolidayRequest.fetchHoliday('2024', '09');

  // data.then((response) => {
  //   console.log(response?.data.response.body.items.item);
  //   // const { data } = response;
  //   // console.log(data);
  // });

  return (
    <>
      <Flicking
        ref={flickingRef}
        bound={true}
        preventDefaultOnDrag={true}
        preventEventsBeforeInit={true}
        renderOnlyVisible={false}
        circular={true}
        duration={300}
        defaultIndex={1}
        interruptable={false}
        onMove={(e) => (flickingPosRef.current = e.axesEvent.pos.flick)}
        onMoveEnd={handleOnMoveEnd}
        moveType={['strict', { count: 1 }]}
        changeOnHold={true}
        threshold={50}
        inputType={['touch', 'mouse', 'pointer']}
        // onChanged={(e) => {
        //   setCurrIdx(e.index);
        // }}
        onWillRestore={() => (isCanceledRef.current = 1)}
        onWillChange={() => (isCanceledRef.current = 0)}
      >
        {dates.map((date, idx) => (
          <div key={idx} style={{ width: '100%', height: '100%' }}>
            <Calendar
              date={date}
              handleFlicking={handleFlicking}
              type={Nav[idx]}
            />
          </div>
        ))}
      </Flicking>
    </>
  );
}

export default CalendarView;
