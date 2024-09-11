import { useState } from 'react';
import TimeSelectModal from '@components/modal/time-select-modal';
import styled from 'styled-components';

interface TimeSelectProps {
  time: string;
  onScheduleTimeChange: (newTime: string) => void;
}

function TimeSelect({ time, onScheduleTimeChange }: TimeSelectProps) {
  const [isTimeSelectModalOpen, setIsTimeSelectModalOpen] = useState(false);

  return (
    <>
      {isTimeSelectModalOpen && (
        <TimeSelectModal
          onClose={() => setIsTimeSelectModalOpen(false)}
          defaultTime={time}
          cb={onScheduleTimeChange}
        />
      )}
      <S.Container>
        <S.Button onClick={() => setIsTimeSelectModalOpen(true)}>
          {time}
        </S.Button>
      </S.Container>
    </>
  );
}

export default TimeSelect;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    width: 90px;
    background-color: var(--green03);
    border-radius: 10px;
  `,
  Button: styled.button`
    font-size: 16px;
    font-weight: 100;
    padding: 5px;
  `,
};
