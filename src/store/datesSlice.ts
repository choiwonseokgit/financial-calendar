import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addDays, addMonths, formatISO } from 'date-fns';
import { View } from 'react-big-calendar';
import type { RootState } from '@store/index';

type Dates = [string, string, string];
//type Dates = string[];

interface TInit {
  date: string;
  view: View;
}

interface TChangeDates {
  idx: number;
}

const initialState: Dates = [
  formatISO(addMonths(new Date(), -1)),
  formatISO(new Date()),
  formatISO(addMonths(new Date(), 1)),
];

export const datesSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    today: (): Dates => {
      return [
        formatISO(addMonths(new Date(), -1)),
        formatISO(new Date()),
        formatISO(addMonths(new Date(), 1)),
      ];
    },
    prev: (dates, action: PayloadAction<TChangeDates>) => {
      const { idx } = action.payload;
      switch (idx) {
        case 0:
          return [
            dates[0],
            formatISO(addMonths(dates[0], -2)),
            formatISO(addMonths(dates[0], -1)),
          ];
        case 1:
          return [
            formatISO(addMonths(dates[1], -1)),
            dates[1],
            formatISO(addMonths(dates[1], -2)),
          ];
        case 2:
          return [
            formatISO(addMonths(dates[2], -2)),
            formatISO(addMonths(dates[2], -1)),
            dates[2],
          ];
        default:
          return dates;
      }

      return [dates[0], dates[1], formatISO(addMonths(dates[0], -1))];
      return [dates[0], dates[0], dates[2]];
    },
    next: (dates, action: PayloadAction<TChangeDates>) => {
      const { idx } = action.payload;
      switch (idx) {
        case 0:
          return [
            dates[0],
            formatISO(addMonths(dates[0], 1)),
            formatISO(addMonths(dates[0], 2)),
          ];
        case 1:
          return [
            formatISO(addMonths(dates[1], 2)),
            dates[1],
            formatISO(addMonths(dates[1], 1)),
          ];
        case 2:
          return [
            formatISO(addMonths(dates[2], 1)),
            formatISO(addMonths(dates[2], 2)),
            dates[2],
          ];
        default:
          return dates;
      }
      return [dates[0], dates[2], dates[2]];
    },
    init: (_, action: PayloadAction<TInit>) => {
      const { date, view } = action.payload;
      const changeDate = view === 'day' ? addDays : addMonths;

      return [
        formatISO(changeDate(date, -1)),
        date,
        formatISO(changeDate(date, 1)),
      ];
    },
  },
});
export const { today, prev, next, init } = datesSlice.actions;

export const selectDates = (state: RootState) => state.dates;

export default datesSlice.reducer;
