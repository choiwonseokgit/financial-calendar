import { useState } from 'react';
import FlickingContainer from '../../flicking-container';

interface MonthFlickingProps {
  currSelectMonth: string;
  onMonthChange: (newMonth: string) => void;
}

function MonthFlicking({ currSelectMonth, onMonthChange }: MonthFlickingProps) {
  const months = Array.from({ length: 12 }, (_, idx) =>
    (idx + 1).toString().padStart(2, '0'),
  );
  const defaultIdx = months.findIndex((month) => month === currSelectMonth);
  const [currIdx, setCurrIdx] = useState(defaultIdx);

  const handleCurrIdxChange = (idx: number) => {
    setCurrIdx(idx);
  };

  return (
    <FlickingContainer
      defaultIdx={defaultIdx}
      currIdx={currIdx}
      onDateUnitChange={(idx: number) => {
        handleCurrIdxChange(idx);
        onMonthChange(months[idx]);
      }}
      endIdx={months.length - 1}
    >
      {months.map((month, idx) => (
        <div
          key={month}
          className={`date-panel ${idx === currIdx ? 'selected' : ''}`}
        >
          {month}
        </div>
      ))}
    </FlickingContainer>
  );
}

export default MonthFlicking;
