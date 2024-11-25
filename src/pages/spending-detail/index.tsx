import InitialSpending from '@components/initial-spending';
import LoadingSpinner from '@components/loading-spinner';
import SpendingPageContainer from '@components/spending-page-container';
import useCalendarEvents, {
  TFormatCalendarEvents,
} from '@pages/calendar-view/components/calendar/hooks/use-calendar-events';
import { isSpendingEvent } from '@utils/calendar-event-type-guard';
import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function SpendingDetail() {
  const location = useLocation();
  const { startDate }: TFormatCalendarEvents = location.state || {};
  const { calendarEvents, isLoading } = useCalendarEvents(startDate);

  const spendingEvents = calendarEvents.filter(isSpendingEvent);

  const date = format(parseISO(startDate), 'yyyy/MM/dd EEEE', {
    locale: ko,
  });

  const targetId = format(startDate, 'yyyy/MM/dd');

  const targetEvents = spendingEvents.find((event) => event.id === targetId);

  const total = targetEvents && parseIntAndMakeLocaleKR(targetEvents.total);

  return (
    <SpendingPageContainer type="SpendingDetail" date={date}>
      {isLoading ? (
        <LoadingSpinner height="100dvh" />
      ) : (
        <S.Contents>
          {targetEvents ? (
            <>
              <S.Total>금일 총 지출: {total}원</S.Total>
              {targetEvents.detailEvents.map((event) => (
                <InitialSpending key={event.id} spendingEvent={event} />
              ))}
            </>
          ) : (
            <S.Notice>금일 지출이 없습니다!</S.Notice>
          )}
        </S.Contents>
      )}
    </SpendingPageContainer>
  );
}

export default SpendingDetail;

const S = {
  Contents: styled.div`
    height: 100dvh;
    background-color: var(--white);
    padding-inline: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--green04);
  `,
  Total: styled.div`
    color: var(--green05);
  `,
  Notice: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--green05);
    flex-grow: 1;
  `,
};
