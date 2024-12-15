import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';

import useGetHolidayTitle from '@hooks/use-get-holiday-title';
import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';

import type { SpendingMoney } from '@/types/calendar';

interface ChartInitSpendingProps {
  onClick: () => void;
  borderColor: string;
  spendingEvent: SpendingMoney;
}

function InitialChartSpending({
  onClick,
  borderColor,
  spendingEvent,
}: ChartInitSpendingProps) {
  const { spentMoney, memo, date } = spendingEvent;
  const formattedDate = format(date, 'MM/dd E', { locale: ko });
  const holidayTitle = useGetHolidayTitle(date);
  const formatSpentMoney = parseIntAndMakeLocaleKR(spentMoney);

  return (
    <S.Container onClick={onClick} $borderColor={borderColor}>
      <S.Date
        $day={
          holidayTitle
            ? '공휴일'
            : formattedDate.slice(formattedDate.length - 1)
        }
      >
        {formattedDate.slice(0, formattedDate.length - 1)}
        <span>{formattedDate.slice(formattedDate.length - 1)}</span>
        <span>{holidayTitle && `(${holidayTitle})`}</span>
      </S.Date>
      {memo && <S.Memo>{memo}</S.Memo>}
      <div>{formatSpentMoney}원</div>
    </S.Container>
  );
}

export default InitialChartSpending;

const S = {
  Container: styled.div<{ $borderColor?: string }>`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid var(--green04);
    border-color: ${({ $borderColor }) => `${$borderColor}`};
    border-radius: 10px;
  `,
  Date: styled.div<{ $day: string }>`
    color: ${({ $day }) => {
      switch ($day) {
        case '토':
          return 'var(--blue)';
        case '일':
        case '공휴일':
          return 'var(--red)';
        default:
          return 'var(--black)';
      }
    }};
  `,
  Memo: styled.div`
    color: var(--black);
    max-width: 20ch; /* 약 10자 너비로 제한 */
    white-space: nowrap; /* 텍스트를 한 줄로 유지 */
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    text-overflow: ellipsis; /* 넘치는 부분에 ... 표시 */
  `,
};
