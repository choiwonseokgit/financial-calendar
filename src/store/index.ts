import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import datesReducer from './datesSlice';
import { holidayApi } from './query/holidaySlice';
import selectedDateReducer from './selected-date-slice';
import viewReducer from './viewSlice';

export const store = configureStore({
  reducer: {
    dates: datesReducer,
    view: viewReducer,
    selectedDate: selectedDateReducer,
    [holidayApi.reducerPath]: holidayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(holidayApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
