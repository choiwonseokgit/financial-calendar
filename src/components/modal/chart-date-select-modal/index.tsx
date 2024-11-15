import { useReducer } from 'react';
// import calDateAndMakeStr from '@utils/cal-date-and-make-str';
// import { parse } from 'date-fns';
import { useAppDispatch } from '@store/hooks';
// import { select } from '@store/slices/selected-date-slice';
import { changeChartDate } from '@store/slices/chart-slice';
import calDateAndMakeStr from '@utils/cal-date-and-make-str';
import { format, parse } from 'date-fns';
import styled from 'styled-components';
import Modal from '../components/modal';
import MonthFlicking from '../components/month-flicking';
import YearFlicking from '../components/year-flicking';

interface TSelectingDate {
  year: string;
  month: string;
}

interface Action {
  type: 'YEAR' | 'MONTH';
  dateUnit: string;
}

const reducer = (selectingDate: TSelectingDate, action: Action) => {
  return { ...selectingDate, [action.type.toLowerCase()]: action.dateUnit };
};

interface DateSelectModalProps {
  onClose: () => void;
  chartDate: string;
  chartDateType: 'YEAR' | 'MONTH';
  cb: () => void;
}

function ChartDateSelectModal({
  onClose,
  chartDate,
  chartDateType,
  cb,
}: DateSelectModalProps) {
  const dispatch = useAppDispatch();
  const [year, month] = [format(chartDate, 'yyyy'), format(chartDate, 'MM')];
  const [selectingDate, selectingDateDispatch] = useReducer(reducer, {
    year,
    month,
  });

  const handleSubmit = () => {
    const { year, month } = selectingDate;
    const selectedDate = `${year}/${chartDateType === 'MONTH' ? month : '01'}`;

    dispatch(
      changeChartDate(
        calDateAndMakeStr(parse(selectedDate, 'yyyy/MM', new Date())),
      ),
    );
    cb();
  };

  const handleDateUnitChange = (type: 'YEAR' | 'MONTH', dateUnit: string) => {
    selectingDateDispatch({ type: type, dateUnit: dateUnit });
  };

  return (
    <Modal onClose={onClose} type="chart" submitCb={handleSubmit}>
      <S.Container>
        <YearFlicking
          currSelectYear={year}
          onYearChange={(newYear: string) =>
            handleDateUnitChange('YEAR', newYear)
          }
        />
        {chartDateType === 'MONTH' && (
          <MonthFlicking
            currSelectMonth={month}
            onMonthChange={(newMonth: string) =>
              handleDateUnitChange('MONTH', newMonth)
            }
          />
        )}
      </S.Container>
    </Modal>
  );
}

export default ChartDateSelectModal;

const S = {
  Container: styled.div`
    display: flex;
    gap: 15px;
    padding-block: 30px;
  `,
};
