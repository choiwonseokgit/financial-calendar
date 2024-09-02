import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { calendarApi } from './query/calendar-query';
import { holidayApi } from './query/holiday-query';
import { userApi } from './query/user-query';
import calendarOptionReducer from './slices/calendar-option-slice';
import datesReducer from './slices/datesSlice';
import loginCheckReducer from './slices/login-check-slice';
import selectedDateReducer from './slices/selected-date-slice';
import transitionDirectionReducer from './slices/transition-direction-slice';
import viewReducer from './slices/viewSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginCheck', 'calendarOption'],
};

const rootReducer = combineReducers({
  dates: datesReducer,
  view: viewReducer,
  selectedDate: selectedDateReducer,
  calendarOption: calendarOptionReducer,
  transitionDirection: transitionDirectionReducer,
  loginCheck: loginCheckReducer,
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
