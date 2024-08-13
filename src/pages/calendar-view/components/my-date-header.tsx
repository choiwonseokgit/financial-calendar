import React from 'react';
import useGetHolidayTitle from '@hooks/useGetHolidayTitle';
import { DateHeaderProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyDateHeader({ date, label, onDrillDown }: DateHeaderProps) {
  const holidayTitle = useGetHolidayTitle(date);

  return (
    <S.Container $isHoliday={!!holidayTitle}>
      <button onClick={onDrillDown}>{label.replace(/^0/, '')}</button>
      <S.Holiday $isHoliday={!!holidayTitle}>
        {holidayTitle && holidayTitle}
      </S.Holiday>
    </S.Container>
  );
}

export default React.memo(MyDateHeader);

const S = {
  Container: styled.div<{ $isHoliday: boolean }>`
    color: ${({ $isHoliday }) => ($isHoliday ? 'red' : 'inherit')};
    /* display: 'flex';
    justify-content: space-around;
    align-items: center; */
    /* background-color: yellow; */
    //position: relative;
  `,
  Holiday: styled.p<{ $isHoliday: boolean }>`
    font-size: 11px;
    /* width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 60%);*/
    /* display: ${({ $isHoliday }) => ($isHoliday ? 'auto' : 'none')}; */
  `,
};
