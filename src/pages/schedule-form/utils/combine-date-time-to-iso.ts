import { formatISO, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

const combineDateTimeToIso = (
  date: string,
  time: string,
  isAllDay: boolean,
) => {
  const parsedDate = isAllDay
    ? parse(date, 'yyyy/MM/dd', new Date(), { locale: ko })
    : parse(`${date} ${time}`, 'yyyy/MM/dd a hh:mm', new Date(), {
        locale: ko,
      });

  const isoString = formatISO(parsedDate);

  return isoString;
};

export default combineDateTimeToIso;
