export type TModal = 'confirm' | 'form' | 'date';

export const MODAL_TITLE = {
  confirm: '확인',
  form: '스케줄 작성',
  date: '날짜 선택',
} as const;

export type TModalTitle = typeof MODAL_TITLE;

export const CONFIRM_MODAL_MESSAGES = {
  form: '마저 작성해주세요!',
  moneyInput: '사용한 돈을 기입해주세요!',
  category: '카테고리를 선택해주세요!',
} as const;

export type TConfirmModalContents = typeof CONFIRM_MODAL_MESSAGES;
