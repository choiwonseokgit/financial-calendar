export type TModal = 'confirm' | 'date' | 'time';

export const MODAL_TITLE = {
  confirm: '확인',
  date: '날짜 선택',
  time: '시간 선택',
} as const;

export type TModalTitle = typeof MODAL_TITLE;

export const CONFIRM_MODAL_MESSAGES = {
  moneyInput: '사용한 돈을 기입해주세요!',
  category: '카테고리를 선택해주세요!',
  titleEmpty: '일정 제목을 작성해주세요!',
  sameDate: '시작 날짜와 종료 날짜가 동일합니다!',
  overDate: '날짜 설정이 잘못되었습니다!',
} as const;

export type TConfirmModalMessages = typeof CONFIRM_MODAL_MESSAGES;
