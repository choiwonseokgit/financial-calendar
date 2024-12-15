import { useState } from 'react';

import FlickingContainer from '@components/modal/components/flicking-container';

interface MinuteFlickingProps {
  currSelectMinute: string;
  onMinuteChange: (newMinute: string) => void;
}

function MinuteFlicking({
  currSelectMinute,
  onMinuteChange,
}: MinuteFlickingProps) {
  const minutes = Array.from({ length: 60 }, (_, idx) =>
    idx.toString().padStart(2, '0'),
  );

  const defaultIdx = minutes.findIndex((minute) => minute === currSelectMinute);
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
        onMinuteChange(minutes[idx]);
      }}
      endIdx={minutes.length - 1}
    >
      {minutes.map((minute, idx) => (
        <div
          key={minute}
          className={`date-panel ${idx === currIdx ? 'selected' : ''}`}
        >
          {minute}
        </div>
      ))}
    </FlickingContainer>
  );
}

export default MinuteFlicking;
