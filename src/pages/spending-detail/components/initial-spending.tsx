import { useAppDispatch } from '@store/hooks';
import { TSpendingMoney } from '@store/query/calendar-query';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface InitialSpendingProps {
  spendingEvent: TSpendingMoney;
}

function InitialSpending({ spendingEvent }: InitialSpendingProps) {
  const { category, spentMoney, memo } = spendingEvent;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formatSpentMoney = parseIntAndMakeLocaleKR(spentMoney);

  const moveToEditPage = () => {
    dispatch(changeTransitionDirection('next'));
    navigate('/spending-form?type=edit', {
      state: spendingEvent,
    });
  };

  return (
    <S.Container onClick={moveToEditPage}>
      <S.Category>{category}</S.Category>
      {memo && <S.Memo>{memo}</S.Memo>}
      <div>{formatSpentMoney}원</div>
    </S.Container>
  );
}

export default InitialSpending;

const S = {
  Container: styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid var(--green04);
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
