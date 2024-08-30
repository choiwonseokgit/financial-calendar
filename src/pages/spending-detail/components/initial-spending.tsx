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
  const { category, spentMoney } = spendingEvent;
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
};
