import { useState } from 'react';
import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import ChartDateSelectModal from '@components/modal/chart-date-select-modal';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChartDateTypeBtns from './chart-date-type-btns';

const DATE_TYPES: { type: 'MONTH' | 'YEAR'; title: string }[] = [
  { type: 'MONTH', title: '월별' },
  { type: 'YEAR', title: '연별' },
];

interface ChartNavBarProps {
  initClickedIdx: () => void;
}

function ChartNavBar({ initClickedIdx }: ChartNavBarProps) {
  const { chartDate, chartDateType } = useAppSelector((state) => state.chart);
  const [isChartDateSelectModalOpen, setIsChartDateSelectModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const moveBack = () => {
    dispatch(changeTransitionDirection('right'));
    navigate(-1);
  };

  return (
    <S.Container>
      <button onClick={moveBack}>
        <S.ChevronImg src={chevronLeftIcon} alt="뒤로가기" />
      </button>
      <S.DateSelectBtn onClick={() => setIsChartDateSelectModalOpen(true)}>
        {format(chartDate, chartDateType === 'MONTH' ? 'yyyy년 M월' : 'yyyy년')}
      </S.DateSelectBtn>
      <div>
        {DATE_TYPES.map((dateType) => (
          <ChartDateTypeBtns
            {...dateType}
            key={dateType.type}
            isSelected={chartDateType === dateType.type}
          />
        ))}
      </div>
      {isChartDateSelectModalOpen && (
        <ChartDateSelectModal
          chartDate={chartDate}
          chartDateType={chartDateType}
          onClose={() => setIsChartDateSelectModalOpen(false)}
          cb={initClickedIdx}
        />
      )}
    </S.Container>
  );
}

export default ChartNavBar;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    position: relative;
  `,
  ChevronImg: styled.img`
    width: 15px;
  `,
  DateSelectBtn: styled.button`
    width: 120px;
    font-size: 18px;
    border: 1px solid var(--green04);
    border-radius: 20px;
    padding: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
