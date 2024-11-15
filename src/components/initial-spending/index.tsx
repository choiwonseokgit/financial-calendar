import useGetHolidayTitle from '@hooks/use-get-holiday-title';
import { useAppDispatch } from '@store/hooks';
import { TSpendingMoney } from '@store/query/calendar-query';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface InitialSpendingProps {
  type?: 'chart' | 'spending-datail';
  spendingEvent: TSpendingMoney;
  borderColor?: string;
}

function InitialSpending({
  spendingEvent,
  type = 'spending-datail',
  borderColor,
}: InitialSpendingProps) {
  const { category, spentMoney, memo, date } = spendingEvent;
  const holidayTitle = useGetHolidayTitle(date);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formattedDate = format(date, 'MM/dd E', { locale: ko });
  const formatSpentMoney = parseIntAndMakeLocaleKR(spentMoney);

  const moveToEditPage = () => {
    dispatch(changeTransitionDirection('right'));
    navigate('/spending-form?type=edit', {
      state: spendingEvent,
    });
  };

  if (type === 'chart')
    return (
      <S.Container onClick={moveToEditPage} $borderColor={borderColor}>
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
        {memo && <S.Memo $type={type}>{memo}</S.Memo>}
        <div>{formatSpentMoney}원</div>
      </S.Container>
    );

  return (
    <S.Container onClick={moveToEditPage}>
      <S.Category>{category}</S.Category>
      {memo && <S.Memo>{memo}</S.Memo>}
      <div>{formatSpentMoney}원</div>
    </S.Container>
  );
}

export default InitialSpending;

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
          return 'blue';
        case '일':
        case '공휴일':
          return 'red';
        default:
          return 'black';
      }
    }};
  `,
  Category: styled.div`
    font-weight: bold;
  `,
  Memo: styled.div<{ $type?: InitialSpendingProps['type'] }>`
    color: var(--green05);
    color: ${({ $type }) =>
      `${$type === 'chart' ? 'black' : 'var(--green05)'}`};
    max-width: 20ch; /* 약 10자 너비로 제한 */
    white-space: nowrap; /* 텍스트를 한 줄로 유지 */
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    text-overflow: ellipsis; /* 넘치는 부분에 ... 표시 */
  `,
};
