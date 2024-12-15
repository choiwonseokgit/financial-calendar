import { useNavigate } from 'react-router-dom';

import { BORDER_COLORS } from '@constants/chart-color';
import { useAppDispatch } from '@store/hooks';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';

import InitialChartSpending from './components/initial-chart-spending';
import InitialDetailSpending from './components/initial-detail-spending';

import type { SpendingMoney } from '@/types/calendar';

type InitialSpending = 'chart' | 'detail';

interface InitialSpendingProps {
  spendingEvent: SpendingMoney;
  type?: InitialSpending;
  borderColor?: string;
}

function InitialSpending({
  spendingEvent,
  type = 'detail',
  borderColor = BORDER_COLORS[0],
}: InitialSpendingProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const moveToEditPage = () => {
    dispatch(changeTransitionDirection('right'));
    navigate('/spending-form?type=edit', {
      state: spendingEvent,
    });
  };

  const INITIAL_SPENDING_MAP = {
    chart: (
      <InitialChartSpending
        onClick={moveToEditPage}
        borderColor={borderColor}
        spendingEvent={spendingEvent}
      />
    ),
    detail: (
      <InitialDetailSpending
        onClick={moveToEditPage}
        spendingEvent={spendingEvent}
      />
    ),
  };

  return INITIAL_SPENDING_MAP[type];
}

export default InitialSpending;
