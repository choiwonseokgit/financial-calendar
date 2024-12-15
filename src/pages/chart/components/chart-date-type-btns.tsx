import styled from 'styled-components';

import { useAppDispatch } from '@store/hooks';
import { changeChartType } from '@store/slices/chart-slice';

import type { TChart } from '@/types/chart';

interface ChartDateTypeBtnsProps {
  isSelected: boolean;
  type: TChart;
  title: string;
  cb: () => void;
}

function ChartDateTypeBtns({
  isSelected,
  type,
  title,
  cb,
}: ChartDateTypeBtnsProps) {
  const dispatch = useAppDispatch();

  return (
    <S.Button
      $isSelected={isSelected}
      onClick={() => {
        cb();
        dispatch(changeChartType(type));
      }}
    >
      {title}
    </S.Button>
  );
}

export default ChartDateTypeBtns;

const S = {
  Button: styled.button<{ $isSelected: boolean }>`
    font-size: 10px;
    width: 50px;
    border-radius: 20px;
    padding: 2px;
    background-color: ${({ $isSelected }) =>
      $isSelected ? `var(--green04)` : `none`};
    color: ${({ $isSelected }) =>
      $isSelected ? `var(--white)` : `var(--black)`};
  `,
};
