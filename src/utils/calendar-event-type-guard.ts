import {
  TFormatCalendarEvents,
  TFormatScheduleEvents,
  TFormatSpendingMoneyEvents,
} from '@pages/calendar-view/components/calendar/hooks/use-calendar-events';

export const isSpendingEvent = (
  events: TFormatCalendarEvents,
): events is TFormatSpendingMoneyEvents => {
  return events.type === 'spendingMoney';
};

export const isScheduleEvent = (
  events: TFormatCalendarEvents,
): events is TFormatScheduleEvents => {
  return events.type === 'schedule';
};
