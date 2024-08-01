import { useCallback, useState } from 'react';
import Flicking, { MoveEndEvent } from '@egjs/react-flicking';
import { addMonths } from 'date-fns';
import moment from 'moment';
import { Calendar, View, momentLocalizer } from 'react-big-calendar';
import '@egjs/react-flicking/dist/flicking.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko';

moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

function BigCalendarPrac() {
  const [currIdx, setCurrIdx] = useState(1);
  const [panels, setPanels] = useState([0, 1, 2]);
  const [navigateDate, setNavigateDate] = useState(new Date());
  const [onView, setOnView] = useState<View>('month');
  const currDate = new Date();

  const handleSwipe = (e: MoveEndEvent<Flicking>) => {
    if (e.direction === 'PREV') {
      //setSwipeState('prev');
      // console.log('좌로');

      setPanels([panels[0] - 1, ...panels]);
    } else if (e.direction === 'NEXT') {
      //setSwipeState('next');
      //   console.log('우로');

      setPanels([...panels, panels[panels.length - 1] + 1]);
    }
  };

  const handleNavigate = useCallback(
    (date: Date) => {
      //console.log(isDayView, date);
      setNavigateDate(date);
    },
    [setNavigateDate],
  );

  const handleOnView = useCallback(
    (view: View) => {
      setOnView(view);
    },
    [setOnView],
  );
  return (
    <>
      <Flicking
        renderOnlyVisible={true}
        defaultIndex={1}
        onMoveEnd={handleSwipe}
        moveType={'strict'}
        onChanged={(e) => {
          // console.log(e);
          setCurrIdx(e.index);
        }}
      >
        {panels.map((index) => (
          <div key={index} style={{ width: '100%' }}>
            <div
              className="flicking-panel"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {currIdx}
            </div>
            <Calendar
              localizer={localizer}
              style={{ height: 500 }}
              date={
                onView !== 'month'
                  ? navigateDate
                  : addMonths(currDate, index - 1)
              }
              onNavigate={handleNavigate}
              onView={handleOnView}
            />
          </div>
        ))}
      </Flicking>
    </>
  );
}

export default BigCalendarPrac;
