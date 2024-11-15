import { useState } from 'react';
import FlickingContainer from '@components/modal/components/flicking-container';

interface HourFlickingProps {
  currSelectHour: string;
  onHourChange: (newHour: string) => void;
}

function HourFlicking({ currSelectHour, onHourChange }: HourFlickingProps) {
  const hours = Array.from({ length: 24 }, (_, idx) =>
    idx.toString().padStart(2, '0'),
  );

  const defaultIdx = hours.findIndex((hour) => hour === currSelectHour);
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
        onHourChange(hours[idx]);
      }}
      endIdx={hours.length - 1}
    >
      {hours.map((hour, idx) => (
        <div
          key={hour}
          className={`date-panel ${idx === currIdx ? 'selected' : ''}`}
        >
          {hour}
        </div>
      ))}
    </FlickingContainer>
  );
}

export default HourFlicking;
