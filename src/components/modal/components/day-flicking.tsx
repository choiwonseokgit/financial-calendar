import { useEffect, useState } from 'react';
import { getDaysInMonth } from 'date-fns';
import FlickingContainer from './flicking-container';

interface DayFlickingProps {
  currSelectYear: string;
  currSelectMonth: string;
  currSelectDay: string;
  selectingYear: string;
  selectingMonth: string;
  onDayChange: (newDay: string) => void;
}

function DayFlicking({
  currSelectYear,
  currSelectMonth,
  currSelectDay,
  selectingYear,
  selectingMonth,
  onDayChange,
}: DayFlickingProps) {
  const daysInMonth = getDaysInMonth(
    new Date(+currSelectYear, +currSelectMonth - 1),
  );
  const [days, setDays] = useState<string[]>(
    Array.from({ length: daysInMonth }, (_, idx) =>
      (idx + 1).toString().padStart(2, '0'),
    ),
  );
  const defaultIdx = days.findIndex((day) => day === currSelectDay);
  const [currIdx, setCurrIdx] = useState(defaultIdx);

  const handleCurrIdxChange = (idx: number) => {
    setCurrIdx(idx);
  };

  useEffect(() => {
    const newDaysInMonth = getDaysInMonth(
      new Date(+selectingYear, +selectingMonth - 1),
    );
    const newDays = Array.from({ length: newDaysInMonth }, (_, idx) =>
      (idx + 1).toString().padStart(2, '0'),
    );
    setDays(newDays);
  }, [selectingYear, selectingMonth]);

  return (
    <FlickingContainer
      defaultIdx={defaultIdx}
      currIdx={currIdx}
      onDateUnitChange={(idx: number) => {
        handleCurrIdxChange(idx);
        onDayChange(days[idx]);
      }}
      endIdx={days.length - 1}
    >
      {days.map((day, idx) => (
        <div
          key={day}
          className={`date-panel ${idx === currIdx ? 'selected' : ''}`}
        >
          {day}
        </div>
      ))}
    </FlickingContainer>
  );
}

export default DayFlicking;
