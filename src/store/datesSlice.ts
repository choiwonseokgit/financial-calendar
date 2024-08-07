import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addDays, addMonths, formatISO } from 'date-fns';
import { View } from 'react-big-calendar';
import type { RootState } from '@store/index';

type Dates = [string, string, string];

interface TPayload {
  date: string;
  view: View;
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
    prev: (dates) => {
      return [dates[0], dates[0], dates[2]];
    },
    next: (dates) => {
      return [dates[0], dates[2], dates[2]];
    },
    init: (_, action: PayloadAction<TPayload>) => {
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
