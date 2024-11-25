import { useGetSpendingMoneyQuery } from '@store/query/calendar-query';
import { format } from 'date-fns';
import styled from 'styled-components';

interface NoticeProps {
  date: string;
}

function SpendingNotice({ date }: NoticeProps) {
  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];

  const { data: spendingMoneyEvents, isLoading } = useGetSpendingMoneyQuery({
    year,
    month,
  });

  if (isLoading) return <S.Container>로딩중입니다...⏳</S.Container>;

  if (!spendingMoneyEvents?.targetMonthSpending) {
    return <S.Container>목표 지출을 설정해 보세요!🧐</S.Container>;
  }

  const remainSpending =
    parseInt(spendingMoneyEvents.targetMonthSpending.targetMoney) -
    spendingMoneyEvents.total;

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
    font-size: 13px;
    font-weight: normal;
    width: 100%;
    white-space: nowrap;
  `,
  Notice: styled.span<{ $color: string }>`
    color: ${({ $color }) => $color};
    font-weight: bold;
  `,
};
