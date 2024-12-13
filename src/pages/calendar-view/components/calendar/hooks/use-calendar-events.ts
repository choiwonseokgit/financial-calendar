import { format, parseISO } from 'date-fns';

import { useAppSelector } from '@store/hooks';
import { useGetSpendingMoneyQuery } from '@store/query/calendar-query';
import {
  isScheduleEvent,
  isSpendingEvent,
} from '@utils/calendar-event-type-guard';

import { Schedule, SpendingMoney } from '@/types/calendar';

export interface TFormatSpendingMoneyEvents {
  id: string;
  total: string;
  startDate: string;
  endDate: string;
  detailEvents: SpendingMoney[];
  type: 'spendingMoney';
}

export interface TFormatScheduleEvents extends Schedule {
  type: 'schedule';
}

export type TFormatCalendarEvents =
  | TFormatSpendingMoneyEvents
  | TFormatScheduleEvents;

type TCalendarEvents = (date: Date | string) => {
  calendarEvents: TFormatCalendarEvents[];
  isLoading: boolean;
};
//스케줄 이벤트는  보류
const useCalendarEvents: TCalendarEvents = (date) => {
  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
  const { data: spendingMoneyEvents, isLoading } = useGetSpendingMoneyQuery({
    year,
    month,
  });
  const calendarOption = useAppSelector((state) => state.calendarOption);

  const dailySpendingEventsMap = new Map();

  spendingMoneyEvents?.targetDateSpendingMoney.forEach((el) => {
    const idDate = format(parseISO(el.date), 'yyyy/MM/dd');

    if (dailySpendingEventsMap.has(idDate)) {
      const existingEvent = dailySpendingEventsMap.get(idDate);
      existingEvent.detailEvents.push(el);
      // total 계산
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
        type: 'spendingMoney',
      };

      dailySpendingEventsMap.set(idDate, newEvent);
    }
  });

  const formatedSpendingMoneyEvents: TFormatSpendingMoneyEvents[] = Array.from(
    dailySpendingEventsMap.values(),
  );

  const allEvents = [...formatedSpendingMoneyEvents];

  const calendarEvents = allEvents.filter((event) => {
    const {
      spendingMoney: isSpendingEventsVisible,
      schedule: isScheduleEventVisible,
    } = calendarOption;
    switch (true) {
      case !isSpendingEventsVisible && isSpendingEvent(event):
        return false;
      case !isScheduleEventVisible && isScheduleEvent(event):
        return false;
      default:
        return true;
    }
  });

  return { calendarEvents, isLoading };

  // const { data: scheduleEvents } = useGetScheduleQuery({
  //   year,
  //   month,
  // });

  // const formatedScheudleEvents: TFormatScheduleEvents[] =
  //   scheduleEvents?.map((event) => ({
  //     ...event,
  //     type: 'schedule',
  //   })) ?? [];

  // const allEvents = [...formatedSpendingMoneyEvents, ...formatedScheudleEvents];
};

export default useCalendarEvents;
