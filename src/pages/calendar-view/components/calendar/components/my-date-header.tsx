import React from 'react';
import useGetHolidayTitle from '@hooks/use-get-holiday-title';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { select } from '@store/slices/selected-date-slice';
import { format } from 'date-fns';
import { DateHeaderProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyDateHeader({ date, label }: DateHeaderProps) {
  const holidayTitle = useGetHolidayTitle(date);
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const calendarOption = useAppSelector((state) => state.calendarOption);
  const { holiday: isHolidayVisible } = calendarOption;
  const dispatch = useAppDispatch();
  const fullDate = format(date, 'yyyy/MM/dd');
  const isSelected = selectedDate === fullDate;

  const handleDateBtnClick = () => {
    dispatch(select(format(date, 'yyyy/MM/dd')));
  };

  return (
    <S.Container $isHoliday={!!holidayTitle}>
      <S.DateBtn $isSelected={isSelected} onClick={handleDateBtnClick}>
        {label.replace(/^0/, '')}
      </S.DateBtn>
      <S.Holiday $isHoliday={!!holidayTitle}>
        {isHolidayVisible && holidayTitle && holidayTitle}
      </S.Holiday>
    </S.Container>
  );
}

export default MyDateHeader;

const S = {
  Container: styled.div<{ $isHoliday: boolean }>`
    color: ${({ $isHoliday }) => ($isHoliday ? 'red' : 'inherit')};
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
  `,
};
