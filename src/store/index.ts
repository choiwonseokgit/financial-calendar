import { configureStore } from '@reduxjs/toolkit';
import datesReducer from './datesSlice';
import viewReducer from './viewSlice';

export const store = configureStore({
  reducer: {
    dates: datesReducer,
    view: viewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
