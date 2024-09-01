import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TCalendarOption {
  spendingMoney: boolean;
  schedule: boolean;
  holiday: boolean;
}

const initialState: TCalendarOption = {
  spendingMoney: true,
  schedule: true,
  holiday: true,
};

export const calendarOptionSlice = createSlice({
  name: 'calendarOption',
  initialState,
  reducers: {
    toggleOption: (state, action: PayloadAction<keyof TCalendarOption>) => {
      const key = action.payload;
      state[key] = !state[key];
    },
  },
});

export const { toggleOption } = calendarOptionSlice.actions;
export default calendarOptionSlice.reducer;
