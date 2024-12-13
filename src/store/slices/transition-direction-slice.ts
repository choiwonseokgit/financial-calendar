import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TransitionDirection {
  direction: 'left' | 'right';
}

const initialState: TransitionDirection = { direction: 'right' };

export const transitionDirectionSlice = createSlice({
  name: 'transitionDirection',
  initialState,
  reducers: {
    changeTransitionDirection: (
      state,
      action: PayloadAction<TransitionDirection['direction']>,
    ) => {
      state.direction = action.payload;
    },
  },
});

export const { changeTransitionDirection } = transitionDirectionSlice.actions;
export default transitionDirectionSlice.reducer;
