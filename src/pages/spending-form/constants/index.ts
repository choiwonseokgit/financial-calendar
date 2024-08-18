export const ADD_MONEY_BTNS = [
  { label: '+50000', val: 50000 },
  { label: '+10000', val: 10000 },
  { label: '+1000', val: 1000 },
  { label: '+100', val: 100 },
] as const;

export const CATEGORYS = [
  { name: '식사', emoji: '🍽' },
  { name: '교통', emoji: '🚌' },
  { name: '의료비', emoji: '💊' },
  { name: '데이트', emoji: '💑' },
  { name: '쇼핑', emoji: '🛍' },
  { name: '통신비', emoji: '📱' },
  { name: '카페', emoji: '☕️' },
  { name: '음주', emoji: '🍻' },
  { name: '교육비', emoji: '📚' },
  { name: '여행', emoji: '✈️' },
  { name: '캠핑', emoji: '⛺️' },
  { name: '선물', emoji: '🎁' },
  { name: '운동', emoji: '🏋️‍♂️' },
  { name: '마트', emoji: '🛒' },
  { name: '야식', emoji: '🍕' },
] as const;

export type TCategory = (typeof CATEGORYS)[number];
