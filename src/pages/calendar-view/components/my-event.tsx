import { EventProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyEvent({ title }: EventProps) {
  return <S.Container>{title}</S.Container>;
}

export default MyEvent;

const S = {
  Container: styled.div``,
};
