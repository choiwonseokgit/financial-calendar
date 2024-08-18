export const CALENDAR_CHECK_LIST = [
  { label: '가계부 리스트 보기' },
  {
    label: '스케줄 리스트 보기',
  },
] as const;

export type TCalendarCheckList = (typeof CALENDAR_CHECK_LIST)[number];
