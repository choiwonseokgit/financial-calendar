import { useAppSelector } from '@store/hooks';
import { spendingMoneyApiResponse } from '@store/query/calendar-query';
import { format } from 'date-fns';
import styled from 'styled-components';

interface NoticeProps {
  date: string;
}

function SpendingNotice({ date }: NoticeProps) {
  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];

  const spendingMoneyData = useAppSelector(
    (state) =>
      state.calendarApi.queries[
        `getSpendingMoney({"month":"${month}","year":"${year}"})`
      ]?.data as spendingMoneyApiResponse | undefined,
  );

  if (!spendingMoneyData?.targetMonthSpending) {
    return <S.Container>목표 지출을 설정해 보세요!🧐</S.Container>;
  }

  const remainSpending =
    parseInt(spendingMoneyData.targetMonthSpending.targetMoney) -
    spendingMoneyData.total;

  const message =
    remainSpending < 0 ? (
      <>
        이번 달은 <S.Notice $color="red">비상</S.Notice>
        입니다!🚨
      </>
    ) : (
      <>
        이번 달은 <S.Notice $color="blue">양호</S.Notice>
        합니다!😀
      </>
    );

  return (
    <S.Container>
      <div>{message}</div>
    </S.Container>
  );
}

export default SpendingNotice;

const S = {
  Container: styled.div`
    position: absolute;
    display: flex;
    /* justify-content: center; */
    font-size: 13px;
    font-weight: normal;
    /* background-color: red; */
    width: 100%;

    left: 50%;
    transform: translate(-50%);
    white-space: nowrap;
  `,
  Notice: styled.span<{ $color: string }>`
    color: ${({ $color }) => $color};
    font-weight: bold;
  `,
};
