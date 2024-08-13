import { addDays, addMonths, formatISO } from 'date-fns';
import { View } from 'react-big-calendar';

const calDateAndMakeStr = (
  date: Date | string,
  num: number = 0,
  type: View = 'month',
) => {
  if (type === 'day') return formatISO(addDays(date, num));
  return formatISO(addMonths(date, num));
};

export default calDateAndMakeStr;
