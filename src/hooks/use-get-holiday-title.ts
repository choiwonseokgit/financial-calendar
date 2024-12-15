import { format } from 'date-fns';

import { useGetHolidayQuery } from '@store/query/holiday-query';

const useGetHolidayTitle = (date: Date | string) => {
  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
  const fullDate = format(date, 'yyyyMMdd');

  const { data, isLoading, isError } = useGetHolidayQuery({
    year,
    month,
  });

  if (isLoading || isError || !data) return null;

  const { holidays } = data;

  if (!holidays) return null;

  if (Array.isArray(holidays)) {
    return (
      holidays.find((holiday) => holiday.locdate === +fullDate)?.dateName ||
      null
    );
  }

  return holidays?.locdate === +fullDate ? holidays.dateName : null;
};

export default useGetHolidayTitle;
