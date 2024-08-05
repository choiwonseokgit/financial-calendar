import { useLayoutEffect, useRef, useState } from 'react';
import Flicking, { MoveEndEvent } from '@egjs/react-flicking';
import { addMonths } from 'date-fns';
import '@egjs/react-flicking/dist/flicking.css';
import Calendar from './components/calendar';
//TODO: 서버사이드 렌더링으로 적용하면 잘 될듯?
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
  const flickingDirectionRef = useRef<'PREV' | 'NEXT' | 'NONE'>('NONE');
  const flickingPosRef = useRef(600);

  const handleOnMoveEnd = (e: MoveEndEvent<Flicking>) => {
    const isFlickingCanceled = !!isCanceledRef.current;
    // console.log(isFlickingCanceled || !e.axesEvent.isTrusted);
    if (isFlickingCanceled || !e.axesEvent.isTrusted) return;

    // console.log(flickingDirectionRef.current);

    const direction = flickingPosRef.current > 600 ? 'NEXT' : 'PREV';

    if (direction === 'PREV') {
      setDates([dates[0], dates[0], dates[2]]);
    } else if (direction === 'NEXT') {
      setDates([dates[0], dates[2], dates[2]]);
    }

    setIsFlicking(true);
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
        onMoveStart={(e) => {
          if (e.axesEvent.isTrusted) {
            flickingDirectionRef.current = e.direction;
          }
        }}
        onMove={(e) => {
          flickingPosRef.current = e.axesEvent.pos.flick;
          console.log(flickingPosRef.current);
        }}
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
