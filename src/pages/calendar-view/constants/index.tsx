export const CALENDAR_CHECK_LIST = [
  { type: 'spendingMoney', label: '가계부 리스트 보기' },
  {
    type: 'schedule',
    label: '스케줄 리스트 보기',
  },
] as const;

export type TCalendarCheckList = (typeof CALENDAR_CHECK_LIST)[number];
