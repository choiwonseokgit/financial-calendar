import { useState } from 'react';
import DateSelectModal from '@components/modal/date-select-modal';
import styled from 'styled-components';

interface DateSelectProps {
  date: string;
  onScheduleDateChange: (newDate: string) => void;
}

function DateSelect({ date, onScheduleDateChange }: DateSelectProps) {
  const [isDateSelectModalOpen, setIsDateSelectModalOpen] = useState(false);

  return (
    <>
      {isDateSelectModalOpen && (
        <DateSelectModal
          onClose={() => setIsDateSelectModalOpen(false)}
          defaultDate={date}
          cb={{
            type: 'SCHEDULE_FORM',
            onScheduleDateChange,
          }}
        />
      )}
      <S.Container>
        <S.Button onClick={() => setIsDateSelectModalOpen(true)}>
          {date}
        </S.Button>
      </S.Container>
    </>
  );
}

export default DateSelect;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    width: 100px;
    background-color: var(--green03);
    border-radius: 10px;
  `,
  Button: styled.button`
    font-size: 16px;
    font-weight: 100;
    padding: 5px;
  `,
};
