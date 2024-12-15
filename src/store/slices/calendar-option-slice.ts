import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CalendarOption {
  spendingMoney: boolean;
  schedule: boolean;
  holiday: boolean;
}

const initialState: CalendarOption = {
  spendingMoney: true,
  schedule: true,
  holiday: true,
};

export const calendarOptionSlice = createSlice({
  name: 'calendarOption',
  initialState,
  reducers: {
    toggleOption: (state, action: PayloadAction<keyof CalendarOption>) => {
      const key = action.payload;
      state[key] = !state[key];
    },
  },
});

export const { toggleOption } = calendarOptionSlice.actions;
export default calendarOptionSlice.reducer;
