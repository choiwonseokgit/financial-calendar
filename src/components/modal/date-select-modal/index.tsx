import { useReducer } from 'react';

import { parse } from 'date-fns';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { select } from '@store/slices/selected-date-slice';
import calDateAndMakeStr from '@utils/cal-date-and-make-str';

import DayFlicking from '../components/day-flicking';
import Modal from '../components/modal';
import MonthFlicking from '../components/month-flicking';
import YearFlicking from '../components/year-flicking';

interface SelectingDate {
  year: string;
  month: string;
  day: string;
}

type TDateUnit = keyof SelectingDate;

interface Action {
  type: TDateUnit;
  dateUnit: string;
}

const reducer = (selectingDate: SelectingDate, action: Action) => {
  return { ...selectingDate, [action.type.toLowerCase()]: action.dateUnit };
};

type CalendarView = {
  type: 'calendar-view';
  onCalendarDatesInit: (newDate: string) => void;
};

type ScheduleForm = {
  type: 'schedule-form';
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
  const dispatch = useAppDispatch();
  const [year, month, day] = (defaultDate ? defaultDate : selectedDate).split(
    '/',
  );
  const [selectingDate, selectingDateDispatch] = useReducer(reducer, {
    year,
    month,
    day,
  });

  const handleSubmit = () => {
    const { year, month, day } = selectingDate;
    const selectedDate = `${year}/${month}/${day}`;

    switch (cb?.type) {
      case 'schedule-form':
        cb.onScheduleDateChange(selectedDate);
        break;
      case 'calendar-view':
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

  const handleDateUnitChange = (type: TDateUnit, dateUnit: string) => {
    selectingDateDispatch({ type, dateUnit });
  };

  return (
    <Modal onClose={onClose} type="date" submitCb={handleSubmit}>
      <S.Container>
        <YearFlicking
          currSelectYear={year}
          onYearChange={(newYear: string) =>
            handleDateUnitChange('year', newYear)
          }
        />
        <MonthFlicking
          currSelectMonth={month}
          onMonthChange={(newMonth: string) =>
            handleDateUnitChange('month', newMonth)
          }
        />
        <DayFlicking
          currSelectYear={year}
          currSelectMonth={month}
          currSelectDay={day}
          selectingYear={selectingDate.year}
          selectingMonth={selectingDate.month}
          onDayChange={(newDay: string) => handleDateUnitChange('day', newDay)}
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
