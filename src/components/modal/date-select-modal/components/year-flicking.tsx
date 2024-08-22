import { useState } from 'react';
import FlickingContainer from '../../flicking-container';

interface YearFlickingProps {
  currSelectYear: string;
  onYearChange: (newYear: string) => void;
}

function YearFlicking({ currSelectYear, onYearChange }: YearFlickingProps) {
  const currYear = new Date().getFullYear();

  // 연도 배열 생성: 현재 연도 기준으로 +-10년
  const years = Array.from({ length: 21 }, (_, idx) =>
    (currYear - 10 + idx).toString(),
  );
  const defaultIdx = years.findIndex((year) => year === currSelectYear);
  const [currIdx, setCurrIdx] = useState(defaultIdx);

  const handleCurrIdxChange = (idx: number) => {
    setCurrIdx(idx);
  };
  //TODO: useEffect 써서 deafultIndex 찾아서 FlickingContainer Props 로 넣어주기

  return (
    <FlickingContainer
      defaultIdx={defaultIdx}
      currIdx={currIdx}
      onDateUnitChange={(idx: number) => {
        handleCurrIdxChange(idx);
        onYearChange(years[idx]);
      }}
      endIdx={years.length - 1}
    >
      {years.map((year, idx) => (
        <div
          key={year}
          className={`date-panel ${idx === currIdx ? 'selected' : ''}`}
        >
          {year}
        </div>
      ))}
    </FlickingContainer>
  );
}

export default YearFlicking;
