import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { Chart } from '@/types/chart';

const initialState: Chart = {
  chartDate: new Date().toISOString(),
  chartType: 'month',
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    changeChartDate: (state, action: PayloadAction<string>) => {
      state.chartDate = action.payload;
    },
    changeChartType: (state, action: PayloadAction<Chart['chartType']>) => {
      state.chartType = action.payload;
    },
  },
});

export const { changeChartDate, changeChartType } = chartSlice.actions;
export default chartSlice.reducer;
