import { useReducer } from 'react';
import { useAppSelector } from '@store/hooks';
import { select } from '@store/slices/selected-date-slice';
import calDateAndMakeStr from '@utils/cal-date-and-make-str';
import { parse } from 'date-fns';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Modal from '../modal';
import DayFlicking from './components/day-flicking';
import MonthFlicking from './components/month-flicking';
import YearFlicking from './components/year-flicking';

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

type CalendarView = {
  type: 'CALENDAR_VIEW';
  onCalendarDatesInit: (newDate: string) => void;
};

type ScheduleForm = {
  type: 'SCHEDULE_FORM';
  onScheduleDateChange: (newDate: string) => void;
};

interface DateSelectModalProps {
  onClose: () => void;
  defaultDate?: string;
  cb?: CalendarView | ScheduleForm | null;
}

function DateSelectModal({
  onClose,
  defaultDate,
  cb = null,
}: DateSelectModalProps) {
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const dispatch = useDispatch();
  const [year, month, day] = (defaultDate ? defaultDate : selectedDate).split(
    '/',
  );
  const [selectingDate, selectingDateDispatch] = useReducer(reducer, {
    year,
    month,
    day,
  });

  // console.log(onCalendarDatesInit);

  const handleSubmit = () => {
    const { year, month, day } = selectingDate;
    const selectedDate = `${year}/${month}/${day}`;

    switch (cb?.type) {
      case 'SCHEDULE_FORM':
        cb.onScheduleDateChange(selectedDate);
        break;
      case 'CALENDAR_VIEW':
        dispatch(select(selectedDate));
        cb.onCalendarDatesInit(
          calDateAndMakeStr(parse(selectedDate, 'yyyy/MM/dd', new Date())),
        );
        break;
      default:
        dispatch(select(selectedDate));
        break;
    }
  };

  const handleDateUnitChange = (
    type: 'YEAR' | 'MONTH' | 'DAY',
    dateUnit: string,
  ) => {
    selectingDateDispatch({ type: type, dateUnit: dateUnit });
  };

  return (
    <Modal onClose={onClose} type="date" submitCb={handleSubmit}>
      <S.Container>
        <YearFlicking
          currSelectYear={year}
          onYearChange={(newYear: string) =>
            handleDateUnitChange('YEAR', newYear)
          }
        />
        <MonthFlicking
          currSelectMonth={month}
          onMonthChange={(newMonth: string) =>
            handleDateUnitChange('MONTH', newMonth)
          }
        />
        <DayFlicking
          currSelectYear={year}
          currSelectMonth={month}
          currSelectDay={day}
          selectingYear={selectingDate.year}
          selectingMonth={selectingDate.month}
          onDayChange={(newDay: string) => handleDateUnitChange('DAY', newDay)}
        />
      </S.Container>
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
