import React from 'react';
import useGetHolidayTitle from '@hooks/use-get-holiday-title';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { select } from '@store/selected-date-slice';
import { format } from 'date-fns';
import { DateHeaderProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyDateHeader({ date, label }: DateHeaderProps) {
  const holidayTitle = useGetHolidayTitle(date);
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const dispatch = useAppDispatch();
  const isSelected = selectedDate === format(date, 'yyyy/MM/dd');

  const handleDateBtnClick = () => {
    dispatch(select(format(date, 'yyyy/MM/dd')));
  };

  return (
    <S.Container $isHoliday={!!holidayTitle}>
      <S.DateBtn $isSelected={isSelected} onClick={handleDateBtnClick}>
        {label.replace(/^0/, '')}
      </S.DateBtn>
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
  DateBtn: styled.button<{ $isSelected: boolean }>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${({ $isSelected }) => $isSelected && 'var(--green04)'};
    color: ${({ $isSelected }) => $isSelected && 'white'};
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
