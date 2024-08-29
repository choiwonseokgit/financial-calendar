import { useAppSelector } from '@store/hooks';
import { spendingMoneyApiResponse } from '@store/query/spending-money-query';
import { format } from 'date-fns';
import styled from 'styled-components';

interface NoticeProps {
  date: string;
}

function Notice({ date }: NoticeProps) {
  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];

  const spendingMoneyData = useAppSelector(
    (state) =>
      state.spendingMoneyApi.queries[
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
    remainSpending < 0
      ? '이번 달은 비상 입니다!🚨'
      : '이번 달은 양호 합니다!😀';

  return <S.Container>{message}</S.Container>;
}

export default Notice;

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
};
