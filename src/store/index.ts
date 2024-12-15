import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { calendarApi } from './query/calendar-query';
import { holidayApi } from './query/holiday-query';
import { userApi } from './query/user-query';
import authReducer from './slices/auth-slice';
import calendarOptionReducer from './slices/calendar-option-slice';
import chartReducer from './slices/chart-slice';
import selectedDateReducer from './slices/selected-date-slice';
import transitionDirectionReducer from './slices/transition-direction-slice';
import viewReducer from './slices/viewSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['calendarOption'],
};

const rootReducer = combineReducers({
  view: viewReducer,
  selectedDate: selectedDateReducer,
  calendarOption: calendarOptionReducer,
  transitionDirection: transitionDirectionReducer,
  auth: authReducer,
  chart: chartReducer,
  [holidayApi.reducerPath]: holidayApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [calendarApi.reducerPath]: calendarApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      holidayApi.middleware,
      userApi.middleware,
      calendarApi.middleware,
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
