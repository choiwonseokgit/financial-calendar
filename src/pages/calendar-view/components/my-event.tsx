import { EventProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyEvent({ title, event }: EventProps) {
  const { resource } = event;
  if (resource === 'financial') {
    return <S.Financial>-{title}</S.Financial>;
  }

  return <S.Container>{title}</S.Container>;
}

export default MyEvent;

const S = {
  Container: styled.div``,
  Financial: styled.div`
    display: flex;
    justify-content: center;
    color: 'red';
    font-size: 10px;
  `,
};
