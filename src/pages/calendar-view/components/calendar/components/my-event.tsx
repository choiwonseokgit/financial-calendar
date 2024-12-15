import { useRef } from 'react';

import { EventProps } from 'react-big-calendar';
import styled from 'styled-components';

import { isSpendingEvent } from '@utils/calendar-event-type-guard';
import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';

import { TFormatCalendarEvents } from '../hooks/use-calendar-events';

function MyEvent({ event }: EventProps<TFormatCalendarEvents>) {
  const ref = useRef<HTMLDivElement>(null);

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
    border-radius: 10%;
  `,
  Schedule: styled.div`
    display: flex;
    justify-content: center;
    font-size: 10px;
  `,
};
