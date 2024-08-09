import useGetHolidayTitle from '@hooks/useGetHolidayTitle';
import { DateHeaderProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyDateHeader({ date, label, onDrillDown }: DateHeaderProps) {
  const holidayTitle = useGetHolidayTitle(date);

  return (
    <S.Container isHoliday={!!holidayTitle}>
      <button onClick={onDrillDown}>{label.replace(/^0/, '')}</button>
      <S.Holiday>{holidayTitle && holidayTitle}</S.Holiday>
    </S.Container>
  );
}

export default MyDateHeader;

const S = {
  Container: styled.div<{ isHoliday: boolean }>`
    color: ${({ isHoliday }) => (isHoliday ? 'red' : 'inherit')};
  `,
  Holiday: styled.p`
    font-size: 11px;
  `,
};
