import {
  useLazyGetScheduleQuery,
  useLazyGetSpendingMoneyQuery,
} from '@store/query/calendar-query';
import { useLazyGetHolidayQuery } from '@store/query/holiday-query';
import { format } from 'date-fns';

const useQuriesForDates = (dates: string[]) => {
  const [holidayTrigger] = useLazyGetHolidayQuery();
  const [spendingMoneyTrigger] = useLazyGetSpendingMoneyQuery();
  const [scheduleTrigger] = useLazyGetScheduleQuery();

  const holidayQueries = dates.map((date) => {
    const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
    return () => holidayTrigger({ year, month }, true).unwrap();
  });

  const spendingMoneyQueries = dates.map((date) => {
    const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
    return () => spendingMoneyTrigger({ year, month }, true).unwrap();
  });

  const scheduelQueries = dates.map((date) => {
    const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
    return () => scheduleTrigger({ year, month }, true).unwrap();
  });

  return { holidayQueries, spendingMoneyQueries, scheduelQueries };
};

export default useQuriesForDates;
