import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { holidayApi } from './query/holiday-query';
import { logoutApi } from './query/logout-query';
import { spendingMoneyApi } from './query/spending-money-query';
import { userApi } from './query/user-query';
import calendarOptionReducer from './slices/calendar-option-slice';
import datesReducer from './slices/datesSlice';
import loginReducer from './slices/login-slice';
import selectedDateReducer from './slices/selected-date-slice';
import transitionDirectionReducer from './slices/transition-direction-slice';
import viewReducer from './slices/viewSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'calendarOption'],
};

const rootReducer = combineReducers({
  dates: datesReducer,
  view: viewReducer,
  selectedDate: selectedDateReducer,
  login: loginReducer,
  calendarOption: calendarOptionReducer,
  transitionDirection: transitionDirectionReducer,
  [holidayApi.reducerPath]: holidayApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [spendingMoneyApi.reducerPath]: spendingMoneyApi.reducer,
  [logoutApi.reducerPath]: logoutApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      holidayApi.middleware,
      userApi.middleware,
      spendingMoneyApi.middleware,
      logoutApi.middleware,
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
