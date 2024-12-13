import styled from 'styled-components';

import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';

import type { SpendingMoney } from '@/types/calendar';

interface InitDetailSpendingProps {
  onClick: () => void;
  spendingEvent: SpendingMoney;
}

function InitialDetailSpending({
  onClick,
  spendingEvent,
}: InitDetailSpendingProps) {
  const { category, spentMoney, memo } = spendingEvent;
  const formatSpentMoney = parseIntAndMakeLocaleKR(spentMoney);

  return (
    <S.Container onClick={onClick}>
      <S.Category>{category}</S.Category>
      {memo && <S.Memo>{memo}</S.Memo>}
      <div>{formatSpentMoney}원</div>
    </S.Container>
  );
}

export default InitialDetailSpending;

const S = {
  Container: styled.div<{ $borderColor?: string }>`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid var(--green04);
    border-color: ${({ $borderColor }) => `${$borderColor}`};
    border-radius: 10px;
  `,
  Category: styled.div`
    font-weight: bold;
  `,
  Memo: styled.div`
    color: var(--green05);
    max-width: 20ch; /* 약 10자 너비로 제한 */
    white-space: nowrap; /* 텍스트를 한 줄로 유지 */
    overflow: hidden; /* 넘치는 텍스트 숨기기 */
    text-overflow: ellipsis; /* 넘치는 부분에 ... 표시 */
  `,
};
