import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addDays, format } from 'date-fns';
import type { RootState } from '@store/index';

const initialState = format(new Date(), 'yyyy/MM/dd');

export const selectedDateSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    select: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
    prevDay: (date) => format(addDays(date, -1), 'yyyy/MM/dd'),
    nextDay: (date) => format(addDays(date, 1), 'yyyy/MM/dd'),
  },
});

export const { select, prevDay, nextDay } = selectedDateSlice.actions;

export const selectView = (state: RootState) => state.view;

export default selectedDateSlice.reducer;
