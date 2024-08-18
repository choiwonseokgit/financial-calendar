import { useAppSelector } from '@store/hooks';
import { holidayApi } from '@store/query/holidaySlice';
import { format } from 'date-fns';

const useGetHolidayTitle = (date: Date | string) => {
  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
  const fullDate = format(date, 'yyyyMMdd');

  const holidayTitle = useAppSelector((state) => {
    const holidaysData = holidayApi.endpoints.getHoliday.select({
      year,
      month,
    })(state);

    if (typeof holidaysData.data === 'string') return null;

    const holidays = holidaysData?.data?.item;

    if (Array.isArray(holidays)) {
      return (
        holidays.find((holiday) => holiday.locdate === +fullDate)?.dateName ||
        null
      );
    }

    return holidays?.locdate === +fullDate ? holidays.dateName : null;
  });

  return holidayTitle;
};

export default useGetHolidayTitle;
