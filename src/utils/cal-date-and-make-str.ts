import { addDays, addMonths, formatISO } from 'date-fns';
import { View } from 'react-big-calendar';

const calDateAndMakeStr = (
  date: Date | string,
  num: number = 0,
  view: View = 'month',
) => {
  if (view === 'day') return formatISO(addDays(date, num));
  return formatISO(addMonths(date, num));
};

export default calDateAndMakeStr;
