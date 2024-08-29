import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TTransitionDirection {
  direction: 'prev' | 'next';
}

const initialState: TTransitionDirection = { direction: 'next' };

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
