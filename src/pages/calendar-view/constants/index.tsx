export const CALENDAR_CHECK_LIST = [
  {
    type: 'holiday',
    label: '공휴일 리스트 보기',
  },
  { type: 'spendingMoney', label: '가계부 리스트 보기' },
  // {
  //   type: 'schedule',
  //   label: '스케쥴 리스트 보기',
  // },
] as const;

export type TCalendarCheckList = (typeof CALENDAR_CHECK_LIST)[number];
