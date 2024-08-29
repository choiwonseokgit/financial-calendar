import SpendingPageContainer from '@components/spending-page-container';
import { TFormatSpendingMoneyEvents } from '@pages/calendar-view/components/calendar/hooks/use-format-spending-money-events';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import InitialSpending from './components/initial-spending';

function SpendingDetail() {
  const location = useLocation();
  console.log(location);
  const { total, detailEvents, startDate }: TFormatSpendingMoneyEvents =
    location.state || {};
  const date = format(parseISO(startDate), 'yyyy/MM/dd EEEE', {
    locale: ko,
  });

  const formatTotal = parseInt(total).toLocaleString('ko-KR');

  // console.log(events);

  return (
    <SpendingPageContainer type="SpendingDetail" date={date}>
      <S.Contents>
        <S.Total>금일 총 지출: {formatTotal}원</S.Total>
        {detailEvents.map((event) => (
          <InitialSpending spendingEvent={event} />
        ))}
      </S.Contents>
    </SpendingPageContainer>
  );
}

export default SpendingDetail;

const S = {
  Contents: styled.div`
    height: 100dvh;
    background-color: var(--white);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--green04);
  `,
  Total: styled.div`
    color: var(--green05);
  `,
};
