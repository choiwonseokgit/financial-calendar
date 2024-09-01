import { format, parseISO } from 'date-fns';

const getYearMonthFromISO = (dateIsoStr: string) => {
  const parsedDate = parseISO(dateIsoStr);
  const [year, month] = [format(parsedDate, 'yyyy'), format(parsedDate, 'MM')];

  return { year, month };
};

export default getYearMonthFromISO;
