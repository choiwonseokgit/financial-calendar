import { isAfter, parseISO } from 'date-fns';

const validateDateOrder = (start: string, end: string) => {
  const startDate = parseISO(start);
  const endDate = parseISO(end);

  return isAfter(endDate, startDate);
};

export default validateDateOrder;
