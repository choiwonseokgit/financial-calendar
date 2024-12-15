import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { View } from 'react-big-calendar';


import type { RootState } from '@store/index';

const initialState: View = 'month' as View;
/**
 * 이 문제는 initialState를 문자열 리터럴 타입 'month'로 인식하기 때문입니다.
 * initialState의 타입을 View로 명시적으로 지정하지 않으면,
 * TypeScript는 'month'라는 리터럴 타입으로 인식하게 됩니다.
 */
export const viewsSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    changeView: (_, action: PayloadAction<View>) => {
      return action.payload;
    },
  },
});

export const { changeView } = viewsSlice.actions;

export const selectView = (state: RootState) => state.view;

export default viewsSlice.reducer;
