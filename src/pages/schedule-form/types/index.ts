import { TPastelColors } from '../constants';

export type Schedule = {
  title: string;
  color: TPastelColors['color'];
  memo: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
};

type TitleAction = {
  type: 'TITLE';
  title: string;
};

type ColorAction = {
  type: 'COLOR';
  color: TPastelColors['color'];
};

type MemoAction = {
  type: 'MEMO';
  memo: string;
};

type StartDateAction = {
  type: 'START_DATE';
  startDate: string;
};

type EndDateAction = {
  type: 'END_DATE';
  endDate: string;
};

type StartTimeAction = {
  type: 'START_TIME';
  startTime: string;
};

type EndTimeAction = {
  type: 'END_TIME';
  endTime: string;
};

type isAllDayAction = {
  type: 'IS_ALLDAY_TOGGLE';
};

export type Action =
  | TitleAction
  | ColorAction
  | MemoAction
  | StartDateAction
  | EndDateAction
  | StartTimeAction
  | EndTimeAction
  | isAllDayAction;
