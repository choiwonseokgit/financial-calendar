// const DATE_TYPES = {
//   month: '연별',
//   year: '월별',
// };

import { useAppDispatch } from '@store/hooks';
import { changeChartDateType } from '@store/slices/chart-slice';
import styled from 'styled-components';

interface ChartDateTypeBtnsProps {
  isSelected: boolean;
  type: 'MONTH' | 'YEAR';
  title: string;
}

function ChartDateTypeBtns({
  isSelected,
  type,
  title,
}: ChartDateTypeBtnsProps) {
  const dispatch = useAppDispatch();

  return (
    <S.Button
      $isSelected={isSelected}
      onClick={() => dispatch(changeChartDateType(type))}
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
    color: ${({ $isSelected }) => ($isSelected ? `white` : `black`)};
  `,
};
