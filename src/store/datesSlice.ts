import { createSlice } from '@reduxjs/toolkit';
import { addMonths, formatISO } from 'date-fns';
import type { RootState } from '@store/index';

type Dates = [string, string, string];

const initialState: Dates = [
  formatISO(addMonths(new Date(), -1)),
  formatISO(new Date()),
  formatISO(addMonths(new Date(), 1)),
];

export const datesSlice = createSlice({
  name: 'datesReducer',
  initialState,
  reducers: {
    today: (): Dates => {
      return [
        formatISO(addMonths(new Date(), -1)),
        formatISO(new Date()),
        formatISO(addMonths(new Date(), 1)),
      ];
    },
    prev: (dates): Dates => {
      return [dates[0], dates[0], dates[2]];
    },
    next: (dates): Dates => {
      return [dates[0], dates[2], dates[2]];
    },
    init: (dates): Dates => {
      return [
        formatISO(addMonths(dates[1], -1)),
        dates[1],
        formatISO(addMonths(dates[1], 1)),
      ];
    },
  },
});
export const { today, prev, next, init } = datesSlice.actions;

export const selectDates = (state: RootState) => state.dates;

export default datesSlice.reducer;
