import { useReducer } from 'react';
import { useAppSelector } from '@store/hooks';
import styled from 'styled-components';
import Modal from '../modal';
import DayFlicking from './components/day-flicking';
import MonthFlicking from './components/month-flicking';
import YearFlicking from './components/year-flicking';
// import '@egjs/react-flicking/dist/flicking.css';

interface TSelectingDate {
  year: string;
  month: string;
  day: string;
}

interface Action {
  type: 'YEAR' | 'MONTH' | 'DAY';
  dateUnit: string;
}

const reducer = (selectingDate: TSelectingDate, action: Action) => {
  return { ...selectingDate, [action.type.toLowerCase()]: action.dateUnit };
};

interface DateSelectModalProps {
  onClose: () => void;
}

function DateSelectModal({ onClose }: DateSelectModalProps) {
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const [year, month, day] = selectedDate.split('/');
  const [selectingDate, selectingDateDispatch] = useReducer(reducer, {
    year,
    month,
    day,
  });

  //console.log(selectingDate);

  const handleDateUnitChange = (
    type: 'YEAR' | 'MONTH' | 'DAY',
    dateUnit: string,
  ) => {
    selectingDateDispatch({ type: type, dateUnit: dateUnit });
  };

  return (
    <Modal onClose={onClose} type="date">
      <S.Container>
        <YearFlicking
          currSelectYear={year}
          onYearChange={(dateUnit: string) =>
            handleDateUnitChange('YEAR', dateUnit)
          }
        />
        <MonthFlicking
          currSelectMonth={month}
          onMonthChange={(dateUnit: string) =>
            handleDateUnitChange('MONTH', dateUnit)
          }
        />
        <DayFlicking
          currSelectYear={year}
          currSelectMonth={month}
          currSelectDay={day}
          selectingYear={selectingDate.year}
          selectingMonth={selectingDate.month}
          onDayChange={(dateUnit: string) =>
            handleDateUnitChange('DAY', dateUnit)
          }
        />
      </S.Container>
      <button>확인</button>
    </Modal>
  );
}

export default DateSelectModal;

const S = {
  Container: styled.div`
    display: flex;
    gap: 15px;
    padding-block: 30px;
  `,
};
