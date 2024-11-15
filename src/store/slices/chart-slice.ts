import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TChart {
  chartDate: string;
  chartDateType: 'MONTH' | 'YEAR';
}

const initialState: TChart = {
  chartDate: new Date().toISOString(),
  chartDateType: 'MONTH',
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    changeChartDate: (state, action: PayloadAction<string>) => {
      state.chartDate = action.payload;
    },
    changeChartDateType: (
      state,
      action: PayloadAction<TChart['chartDateType']>,
    ) => {
      state.chartDateType = action.payload;
    },
  },
});

export const { changeChartDate, changeChartDateType } = chartSlice.actions;
export default chartSlice.reducer;
