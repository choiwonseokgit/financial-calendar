import styled from 'styled-components';

import chevronDownIcon from '@assets/icons/chevron-down-solid.svg';
import chevronUpIcon from '@assets/icons/chevron-up-solid.svg';
import InitialSpending from '@components/initial-spending';
import { BACKGROUND_COLORS, BORDER_COLORS } from '@constants/chart-color';

import { SpendingMoney } from '@/types/calendar';

interface CategorySpendingProps {
  category: string;
  percentage: string;
  total: number;
  idx: number;
  onClick: () => void;
  isClicked: boolean;
  initialSpendings: SpendingMoney[];
}

function CategorySpending({
  category,
  percentage,
  total,
  idx,
  onClick,
  isClicked,
  initialSpendings,
}: CategorySpendingProps) {
  return (
    <>
      <S.Container $idx={idx} onClick={onClick}>
        <S.LeftBox>
          <div>{percentage}</div>
          <S.Category>{category}</S.Category>
        </S.LeftBox>
        <S.RightBox>
          <div>{total.toLocaleString()}원</div>
          <S.ChevronIcon
            src={isClicked ? chevronDownIcon : chevronUpIcon}
            alt="확장"
          />
        </S.RightBox>
      </S.Container>
      {isClicked &&
        initialSpendings.map((spending) => (
          <InitialSpending
            key={spending.id}
            type="chart"
            borderColor={BORDER_COLORS[idx]}
            spendingEvent={spending}
          />
        ))}
    </>
  );
}

export default CategorySpending;

const S = {
  Container: styled.div<{ $idx: number }>`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: ${({ $idx }) => `1px solid ${BORDER_COLORS[$idx]}`};
    background-color: ${({ $idx }) => `${BACKGROUND_COLORS[$idx]}`};
    border-radius: 10px;
  `,
  LeftBox: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
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
  RightBox: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  ChevronIcon: styled.img`
    width: 15px;
  `,
};
