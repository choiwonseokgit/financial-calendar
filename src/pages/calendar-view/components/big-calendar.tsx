import { useState } from 'react';
import Flicking, { MoveEndEvent } from '@egjs/react-flicking';
import { ViewportSlot } from '@egjs/react-flicking';
import { addMonths } from 'date-fns';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import '@egjs/react-flicking/dist/flicking.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

//type SwipeState = 'prev' | 'none' | 'next';

function BigCalendar() {
  const [currIdx, setCurrIdx] = useState(1);
  const [currDate, setCurrDate] = useState(new Date());
  // const [swipeState, setSwipeState] = useState<SwipeState>('none');

  const [viewDates, setViewDates] = useState([
    addMonths(new Date(), -1),
    new Date(),
    addMonths(new Date(), 1),
  ]);

  // console.log(viewDates);

  const handleSwipe = (e: MoveEndEvent<Flicking>) => {
    if (e.direction === 'PREV') {
      //setSwipeState('prev');
      // console.log('좌로');
      setCurrIdx(currIdx - 1);
      setViewDates((prevDates) => [addMonths(prevDates[0], -1), ...prevDates]);
    } else if (e.direction === 'NEXT') {
      //setSwipeState('next');
      console.log('우로');
      setCurrIdx(currIdx + 1);
      setViewDates((prevDates) => [
        ...prevDates,
        addMonths(prevDates[prevDates.length - 1], 1),
      ]);
    }
  };

  return (
    <>
      <Flicking
        inputType={['pointer', 'mouse']}
        onMoveEnd={handleSwipe}
        defaultIndex={1}
        renderOnlyVisible={true}
        onSelect={({ index }) => console.log(index)}
      >
        {viewDates.map((date, idx) => (
          <div
            // className="calendar-panel"
            style={{ width: '100%' }}
            key={idx}
          >
            <Calendar
              localizer={localizer}
              events={[]}
              startAccessor="start"
              endAccessor="end"
              date={date}
              onNavigate={(date) => {
                console.log(date);
                setCurrDate(date);
              }}
              style={{ height: 500 }}
            />
          </div>
        ))}
        <ViewportSlot>
          <button
            className="flicking-prev"
            onClick={() =>
              setViewDates((prevDates) => [
                addMonths(prevDates[0], -1),
                ...prevDates,
              ])
            }
          >
            PREV
          </button>
          <button
            className="flicking-next"
            onClick={() => {
              setViewDates([
                ...viewDates,
                addMonths(viewDates[viewDates.length - 1], 1),
              ]);
            }}
          >
            NEXT
          </button>
        </ViewportSlot>
      </Flicking>
      <div className="calendar-panel" style={{ width: '100%' }}>
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          date={currDate}
          onNavigate={(date) => {
            setCurrDate(date);
            console.log(date);
          }}
          style={{ height: 500 }}
        />
      </div>
    </>
  );
}

export default BigCalendar;
