import { useAppSelector } from '@store/hooks';
import {
  TSpendingMoney,
  spendingMoneyApi,
} from '@store/query/spending-money-query';
import { format, parseISO } from 'date-fns';

export interface TFormatSpendingMoneyEvents {
  id: string;
  total: string;
  startDate: string;
  endDate: string;
  detailEvents: TSpendingMoney[];
}

type TUseFormatSpendingMoneyEvents = (
  date: Date | string,
) => TFormatSpendingMoneyEvents[];

const useFormatSpendingMoneyEvents: TUseFormatSpendingMoneyEvents = (date) => {
  const spendingMoneyEvents = useAppSelector((state) => {
    const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
    const events = spendingMoneyApi.endpoints.getSpendingMoney.select({
      year,
      month,
    })(state);

    return events.data;
  });

  const map = new Map();

  spendingMoneyEvents?.targetDateSpendingMoney.forEach((el) => {
    const idDate = format(parseISO(el.date), 'yyyy/MM/dd');

    if (map.has(idDate)) {
      const existingEvent = map.get(idDate);
      existingEvent.detailEvents.push(el);
      // total 업데이트
      existingEvent.total = (
        parseInt(existingEvent.total) + parseInt(el.spentMoney)
      ).toString();
    } else {
      const newEvent: TFormatSpendingMoneyEvents = {
        id: idDate,
        total: el.spentMoney,
        startDate: el.date,
        endDate: el.date,
        detailEvents: [el],
      };

      map.set(idDate, newEvent);
    }
  });

  return Array.from(map.values());
};

export default useFormatSpendingMoneyEvents;
