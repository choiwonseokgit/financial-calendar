import { useReducer } from 'react';

import { format, parse } from 'date-fns';
import styled from 'styled-components';

import { useAppDispatch } from '@store/hooks';
import { changeChartDate } from '@store/slices/chart-slice';
import calDateAndMakeStr from '@utils/cal-date-and-make-str';

import Modal from '../components/modal';
import MonthFlicking from '../components/month-flicking';
import YearFlicking from '../components/year-flicking';

import type { TChart } from '@/types/chart';

interface SelectingDate {
  year: string;
  month: string;
}

interface Action {
  type: TChart;
  dateUnit: string;
}

const reducer = (selectingDate: SelectingDate, action: Action) => {
  return { ...selectingDate, [action.type.toLowerCase()]: action.dateUnit };
};

interface DateSelectModalProps {
  onClose: () => void;
  chartDate: string;
  chartType: TChart;
  cb: () => void;
}

function ChartDateSelectModal({
  onClose,
  chartDate,
  chartType,
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
    const selectedDate = `${year}/${chartType === 'month' ? month : '01'}`;

    dispatch(
      changeChartDate(
        calDateAndMakeStr(parse(selectedDate, 'yyyy/MM', new Date())),
      ),
    );
    cb();
  };

  const handleDateUnitChange = (type: TChart, dateUnit: string) => {
    selectingDateDispatch({ type, dateUnit });
  };

  return (
    <Modal onClose={onClose} type="chart" submitCb={handleSubmit}>
      <S.Container>
        <YearFlicking
          currSelectYear={year}
          onYearChange={(newYear: string) =>
            handleDateUnitChange('year', newYear)
          }
        />
        {chartType === 'month' && (
          <MonthFlicking
            currSelectMonth={month}
            onMonthChange={(newMonth: string) =>
              handleDateUnitChange('month', newMonth)
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
