import {
  // useLazyGetScheduleQuery,
  useLazyGetSpendingMoneyQuery,
} from '@store/query/calendar-query';
import { useLazyGetHolidayQuery } from '@store/query/holiday-query';
import { format } from 'date-fns';
//스케줄 이벤트 보류
const useQuriesForDates = (dates: string[]) => {
  const [holidayTrigger] = useLazyGetHolidayQuery();
  const [spendingMoneyTrigger] = useLazyGetSpendingMoneyQuery();

  const holidayQueries = dates.map((date) => {
    const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
    return () => holidayTrigger({ year, month }, true).unwrap();
  });

  const spendingMoneyQueries = dates.map((date) => {
    const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
    return () => spendingMoneyTrigger({ year, month }, true).unwrap();
  });

  return { holidayQueries, spendingMoneyQueries };
  // const [scheduleTrigger] = useLazyGetScheduleQuery();

  // const scheduelQueries = dates.map((date) => {
  //   const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
  //   return () => scheduleTrigger({ year, month }, true).unwrap();
  // });
};

export default useQuriesForDates;
