import { useState } from 'react';

import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import ChartDateSelectModal from '@components/modal/chart-date-select-modal';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';


import ChartDateTypeBtns from './chart-date-type-btns';

import type { TChart } from '@/types/chart';

const DATE_TYPES: { type: TChart; title: string }[] = [
  { type: 'month', title: '월별' },
  { type: 'year', title: '연별' },
];

interface ChartNavBarProps {
  onClickIdxInit: () => void;
}

function ChartNavBar({ onClickIdxInit }: ChartNavBarProps) {
  const { chartDate, chartType } = useAppSelector((state) => state.chart);
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
        {format(chartDate, chartType === 'month' ? 'yyyy년 M월' : 'yyyy년')}
      </S.DateSelectBtn>
      <div>
        {DATE_TYPES.map((dateType) => (
          <ChartDateTypeBtns
            {...dateType}
            key={dateType.type}
            isSelected={chartType === dateType.type}
            cb={onClickIdxInit}
          />
        ))}
      </div>
      {isChartDateSelectModalOpen && (
        <ChartDateSelectModal
          chartDate={chartDate}
          chartType={chartType}
          onClose={() => setIsChartDateSelectModalOpen(false)}
          cb={onClickIdxInit}
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
    padding: 15px;
    position: relative;
    height: 10dvh;
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
