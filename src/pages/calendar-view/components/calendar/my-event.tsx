import { useEffect, useRef } from 'react';
import { EventProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyEvent({ title, event }: EventProps) {
  const {
    resource: { type, color },
  } = event;
  const ref = useRef<HTMLDivElement>(null);

  //console.log(resource);
  // console.log(color);

  useEffect(() => {
    const element = ref.current;
    if (element && color) {
      const targetElement = element.closest('.rbc-event');
      (targetElement as HTMLElement).style.backgroundColor = `${color}`;
    }
  }, [color]);

  if (type === 'financial') {
    return <S.Financial>-{title}원</S.Financial>;
  }

  return <S.Schedule ref={ref}>{title}</S.Schedule>;
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
