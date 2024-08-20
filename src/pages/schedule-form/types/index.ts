import { TPastelColors } from '../constants';

export type Schedule = {
  title: string;
  color: TPastelColors['color'];
  memo: string;
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

export type Action = TitleAction | ColorAction | MemoAction;
