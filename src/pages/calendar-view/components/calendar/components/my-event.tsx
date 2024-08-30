import { useRef } from 'react';
// import { TSpendingMoney } from '@store/query/spending-money-query';
import { useEffect } from 'react';
import {
  isScheduleEvent,
  isSpendingEvent,
} from '@utils/calendar-event-type-guard';
import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';
import { EventProps } from 'react-big-calendar';
import styled from 'styled-components';
import { TFormatCalendarEvents } from '../hooks/use-calendar-events';

function MyEvent({ event }: EventProps<TFormatCalendarEvents>) {
  const ref = useRef<HTMLDivElement>(null);

  //console.log(resource);
  // console.log(color);
  // console.log('렌더링');

  useEffect(() => {
    if (ref.current && isScheduleEvent(event) && event.color) {
      const targetElement = ref.current.closest('.rbc-event') as HTMLElement;
      if (targetElement) {
        targetElement.style.backgroundColor = event.color;
      }
    }
  }, [event]);

  if (isSpendingEvent(event)) {
    const { total } = event;
    return <S.Financial>-{parseIntAndMakeLocaleKR(total)}</S.Financial>;
  }

  return <S.Schedule ref={ref}>{event.title}</S.Schedule>;
}

export default MyEvent;

const S = {
  Financial: styled.div`
    display: flex;
    justify-content: center;
    font-size: 10px;
    background-color: var(--green04);
    border-radius: 10%;
  `,
  Schedule: styled.div`
    display: flex;
    justify-content: center;
    font-size: 10px;
  `,
};
