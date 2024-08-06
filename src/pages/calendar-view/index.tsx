import { useLayoutEffect, useRef, useState } from 'react';
import Flicking, { MoveEndEvent } from '@egjs/react-flicking';
import { addMonths } from 'date-fns';
import '@egjs/react-flicking/dist/flicking.css';
import { View } from 'react-big-calendar';
import Calendar from './components/calendar';
//TODO: 서버사이드 렌더링으로 데이터 받아오는거 적용해보기
function CalendarView() {
  const currDate = new Date(); //TODO: redux 로 관리
  const [dates, setDates] = useState([
    addMonths(currDate, -1),
    currDate,
    addMonths(currDate, 1),
  ]);
  //const [currIdx, setCurrIdx] = useState(1); //idx 안쓸수도
  const [isFlicking, setIsFlicking] = useState(false);
  const flickingRef = useRef<Flicking>(null);
  const isCanceledRef = useRef(0);
  const flickingPosRef = useRef(600);

  const handleOnMoveEnd = (e: MoveEndEvent<Flicking>) => {
    const isFlickingCanceled = !!isCanceledRef.current;

    if (isFlickingCanceled || !e.axesEvent.isTrusted) return;

    const direction = flickingPosRef.current > 600 ? 'NEXT' : 'PREV';

    if (direction === 'PREV') {
      setDates([dates[0], dates[0], dates[2]]);
    } else if (direction === 'NEXT') {
      setDates([dates[0], dates[2], dates[2]]);
    }

    setIsFlicking(true);
  };

  const handleFlicking = (onView: Partial<View>) => {
    if (onView === 'day') {
      flickingRef.current?.disableInput();
    } else {
      flickingRef.current?.enableInput();
    }
  };

  const moveToInit = async () => {
    await flickingRef.current?.moveTo(1, 0).catch((err) => console.error(err));
  };

  useLayoutEffect(() => {
    if (isFlicking) {
      console.log('effect');
      moveToInit();
      setDates([addMonths(dates[1], -1), dates[1], addMonths(dates[1], 1)]);
      setIsFlicking(false);
    }
  }, [isFlicking]);

  return (
    <>
      <Flicking
        ref={flickingRef}
        bound={true}
        preventDefaultOnDrag={true}
        preventEventsBeforeInit={true}
        renderOnlyVisible={false}
        circular={true}
        duration={200}
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
            <Calendar date={date} handleFlicking={handleFlicking} />
          </div>
        ))}
      </Flicking>
    </>
  );
}

export default CalendarView;
