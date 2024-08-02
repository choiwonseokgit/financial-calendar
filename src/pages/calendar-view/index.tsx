import { useLayoutEffect, useRef, useState } from 'react';
import Flicking, { MoveEndEvent } from '@egjs/react-flicking';
import { addMonths } from 'date-fns';
import '@egjs/react-flicking/dist/flicking.css';
import Calendar from './components/calendar';

function CalendarView() {
  const currDate = new Date();
  const [dates, setDates] = useState([
    addMonths(currDate, -1),
    currDate,
    addMonths(currDate, 1),
  ]);
  const [currIdx, setCurrIdx] = useState(1); //idx 안쓸수도
  const [isFlicking, setIsFlicking] = useState(false);
  const flickingRef = useRef<Flicking>(null);
  const isCanceledRef = useRef(0);

  const handleOnMoveEnd = (e: MoveEndEvent<Flicking>) => {
    const isFlickingCanceled = !!isCanceledRef.current;

    if (isFlickingCanceled) return;

    if (e.direction === 'PREV') {
      setDates([dates[0], dates[0], dates[2]]);
    } else if (e.direction === 'NEXT') {
      setDates([dates[0], dates[2], dates[2]]);
    }
    setIsFlicking(true);
  };

  const moveToInit = async () => {
    await flickingRef.current?.moveTo(1, 0).catch((err) => console.error(err));
  };

  useLayoutEffect(() => {
    if (isFlicking) {
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
        duration={200}
        defaultIndex={1}
        interruptable={false}
        onMoveEnd={handleOnMoveEnd}
        moveType={['strict', { count: 1 }]}
        changeOnHold={true}
        threshold={100}
        inputType={['touch', 'mouse', 'pointer']}
        onChanged={(e) => {
          setCurrIdx(e.index);
        }}
        onWillRestore={() => (isCanceledRef.current = 1)}
        onWillChange={() => (isCanceledRef.current = 0)}
      >
        {dates.map((date, idx) => (
          <div key={idx} style={{ width: '100%' }}>
            <div
              className="flicking-panel"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {currIdx}
            </div>
            <Calendar date={date} />
          </div>
        ))}
      </Flicking>
    </>
  );
}

export default CalendarView;
