// import { useAppSelector } from '@store/hooks';
import {
  // HolidayResponse,
  useGetHolidayQuery,
} from '@store/query/holiday-query';
import { format } from 'date-fns';

const useGetHolidayTitle = (date: Date | string) => {
  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
  const fullDate = format(date, 'yyyyMMdd');

  const { data: holidaysData } = useGetHolidayQuery({ year, month });

  // const holidaysData = useAppSelector(
  //   (state) =>
  //     state.holidayApi.queries[
  //       `getHoliday({"month":"${month}","year":"${year}"})`
  //     ],
  // )?.data as HolidayResponse | undefined;

  if (!holidaysData || !holidaysData.holidays) return null;

  const { holidays } = holidaysData;

  if (Array.isArray(holidays)) {
    return (
      holidays.find((holiday) => holiday.locdate === +fullDate)?.dateName ||
      null
    );
  }

  return holidays?.locdate === +fullDate ? holidays.dateName : null;
};

export default useGetHolidayTitle;
