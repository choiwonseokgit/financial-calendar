// import { useAppSelector } from '@store/hooks';
import { useAppSelector } from '@store/hooks';
import {
  TSchedule,
  TSpendingMoney,
  useGetScheduleQuery,
  // spendingMoneyApi,
  useGetSpendingMoneyQuery,
} from '@store/query/calendar-query';
import {
  isScheduleEvent,
  isSpendingEvent,
} from '@utils/calendar-event-type-guard';
import { format, parseISO } from 'date-fns';

export interface TFormatSpendingMoneyEvents {
  id: string;
  total: string;
  startDate: string;
  endDate: string;
  detailEvents: TSpendingMoney[];
  type: 'spendingMoney';
}

export interface TFormatScheduleEvents extends TSchedule {
  type: 'schedule';
}

export type TFormatCalendarEvents =
  | TFormatSpendingMoneyEvents
  | TFormatScheduleEvents;

type TCalendarEvents = (date: Date | string) => TFormatCalendarEvents[];

//TODO: useCalendarEvents 로 수정 schedules도 받아서

const useCalendarEvents: TCalendarEvents = (date) => {
  // const spendingMoneyEvents = useAppSelector((state) => {
  //   const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];
  //   const events = spendingMoneyApi.endpoints.getSpendingMoney.select({
  //     year,
  //     month,
  //   })(state);

  //   return events.data;
  // });
  const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];

  const { data: spendingMoneyEvents } = useGetSpendingMoneyQuery({
    year,
    month,
  });

  const { data: scheduleEvents } = useGetScheduleQuery({
    year,
    month,
  });

  const calendarOption = useAppSelector((state) => state.calendarOption);

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
        type: 'spendingMoney',
      };

      map.set(idDate, newEvent);
    }
  });

  const formatedSpendingMoneyEvents: TFormatSpendingMoneyEvents[] = Array.from(
    map.values(),
  );

  const formatedScheudleEvents: TFormatScheduleEvents[] =
    scheduleEvents?.map((event) => ({
      ...event,
      type: 'schedule',
    })) ?? [];

  const allEvents = [...formatedSpendingMoneyEvents, ...formatedScheudleEvents];

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

  return calendarEvents;
};

export default useCalendarEvents;
