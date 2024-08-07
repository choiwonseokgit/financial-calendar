import { HeaderProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyMonthHeader({ label }: HeaderProps) {
  return <S.Container $label={label}>{label}</S.Container>;
}

export default MyMonthHeader;

const S = {
  Container: styled.div<{ $label: string }>`
    color: ${({ $label }) =>
      $label === '토' ? 'blue' : $label === '일' ? 'red' : '#9e9e9e'};
    /* color: #5ca08f; */
    font-weight: 500;
  `,
};
