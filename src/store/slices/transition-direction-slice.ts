import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TTransitionDirection {
  direction: 'left' | 'right';
}

const initialState: TTransitionDirection = { direction: 'right' };

export const transitionDirectionSlice = createSlice({
  name: 'transitionDirection',
  initialState,
  reducers: {
    changeTransitionDirection: (
      state,
      action: PayloadAction<TTransitionDirection['direction']>,
    ) => {
      state.direction = action.payload;
    },
  },
});

export const { changeTransitionDirection } = transitionDirectionSlice.actions;
export default transitionDirectionSlice.reducer;
