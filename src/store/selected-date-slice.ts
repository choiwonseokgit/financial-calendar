import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import type { RootState } from '@store/index';

const initialState = format(new Date(), 'yyyy/MM/dd');

export const selectedDateSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    select: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { select } = selectedDateSlice.actions;

export const selectView = (state: RootState) => state.view;

export default selectedDateSlice.reducer;
