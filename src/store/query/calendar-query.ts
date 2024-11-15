import { createApi } from '@reduxjs/toolkit/query/react';
import getYearMonthFromISO from '@utils/get-year-month-from-iso';
import axiosBaseQuery from './axios-base-query';

export interface TSpendingMoney {
  id: number;
  spentMoney: string;
  category: string;
  date: string;
  memo?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface TTargetMonthSpending {
  id: number;
  targetDate: string;
  targetMoney: string;
  userId: number;
}

export interface TSchedule {
  id: number;
  title: string;
  color: string;
  memo: string;
  isAllDay: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface spendingMoneyApiResponse {
  targetMonthSpending: TTargetMonthSpending | null;
  targetDateSpendingMoney: TSpendingMoney[];
  total: number;
}

export interface spendingMoneyForChartApiResponse {
  spendingMoneysForChart: [string, string, TSpendingMoney[]][];
  total: number;
}

export const calendarApi = createApi({
  reducerPath: 'calendarApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  tagTypes: ['SpendingMoney', 'Schedule', 'Chart'],
  endpoints: (builder) => ({
    /****************spending-money/chart*******************/
    getSpendingMoneyForChart: builder.query<
      spendingMoneyForChartApiResponse,
      { year: string; month: string | null }
    >({
      query: ({ month, year }) => ({
        url: `/spending-moneys/chart?month=${month}&year=${year}`,
        method: 'get',
      }),
      providesTags: (result, error, { year, month }) => [
        { type: 'Chart', id: `${year}/${month}` },
      ],
      keepUnusedDataFor: Infinity,
    }),

    /****************spending-money*******************/
    getSpendingMoney: builder.query<
      spendingMoneyApiResponse,
      { year: string; month: string }
    >({
      query: ({ month, year }) => ({
        url: `/spending-moneys?month=${month}&year=${year}`,
        method: 'get',
      }),
      providesTags: (result, error, { year, month }) => [
        { type: 'SpendingMoney', id: `${year}/${month}` },
      ],
      keepUnusedDataFor: Infinity,
    }),

    postSpendingMoney: builder.mutation<
      TSpendingMoney,
      Partial<TSpendingMoney>
    >({
      query: (newSpendingMoney) => ({
        url: '/spending-moneys',
        method: 'post',
        data: newSpendingMoney,
      }),
      invalidatesTags: (result, error, { date }) => {
        if (date) {
          const { year, month } = getYearMonthFromISO(date);
          return [
            { type: 'SpendingMoney', id: `${year}/${month}` },
            {
              type: 'Chart',
              id: `${year}/${month}`,
            },
          ];
        }
        return ['SpendingMoney', 'Chart'];
      },
    }),

    updateSpendingMoney: builder.mutation<
      TSpendingMoney,
      Partial<TSpendingMoney>
    >({
      query: (newSpendingMoney) => ({
        url: '/spending-moneys',
        method: 'patch',
        data: newSpendingMoney,
      }),
      invalidatesTags: (result, error, { date }) => {
        if (date) {
          const { year, month } = getYearMonthFromISO(date);
          return [
            { type: 'SpendingMoney', id: `${year}/${month}` },
            {
              type: 'Chart',
              id: `${year}/${month}`,
            },
          ];
        }
        return ['SpendingMoney', 'Chart'];
      },
    }),

    deleteSpendingMoney: builder.mutation<
      TSpendingMoney,
      Partial<TSpendingMoney>
    >({
      query: ({ id }) => ({
        url: '/spending-moneys',
        method: 'delete',
        data: { id },
      }),
      invalidatesTags: (result, error, { date }) => {
        if (date) {
          const { year, month } = getYearMonthFromISO(date);
          return [
            { type: 'SpendingMoney', id: `${year}/${month}` },
            {
              type: 'Chart',
              id: `${year}/${month}`,
            },
          ];
        }
        return ['SpendingMoney', 'Chart'];
      },
    }),

    /****************target-month-spending*******************/
    postTargetMonthSpending: builder.mutation<
      TTargetMonthSpending,
      {
        year: string;
        month: string;
        targetMoney: string;
      }
    >({
      query: ({ year, month, targetMoney }) => ({
        url: `/target-month-spending?month=${month}&year=${year}`,
        method: 'post',
        data: { targetMoney },
      }),
      invalidatesTags: (result, error, { year, month }) => [
        { type: 'SpendingMoney', id: `${year}/${month}` },
      ],
    }),

    updateTargetMonthSpending: builder.mutation<
      TTargetMonthSpending,
      {
        year: string;
        month: string;
        targetMoney: string;
      }
    >({
      query: ({ year, month, targetMoney }) => ({
        url: `/target-month-spending?month=${month}&year=${year}`,
        method: 'patch',
        data: { targetMoney },
      }),
      invalidatesTags: (result, error, { year, month }) => [
        { type: 'SpendingMoney', id: `${year}/${month}` },
      ],
    }),

    deleteTargetMonthSpending: builder.mutation<
      void,
      {
        year: string;
        month: string;
      }
    >({
      query: ({ year, month }) => ({
        url: `/target-month-spending?month=${month}&year=${year}`,
        method: 'delete',
      }),
      invalidatesTags: (result, error, { year, month }) => [
        { type: 'SpendingMoney', id: `${year}/${month}` },
      ],
    }),

    /****************schedules*******************/
    getSchedule: builder.query<TSchedule[], { year: string; month: string }>({
      query: ({ month, year }) => ({
        url: `/schedules?month=${month}&year=${year}`,
        method: 'get',
      }),
      providesTags: (result, error, { year, month }) => [
        { type: 'Schedule', id: `${year}/${month}` },
      ],
      keepUnusedDataFor: Infinity,
    }),

    postSchedule: builder.mutation<TSchedule, Partial<TSchedule>>({
      query: (newSpendingMoney) => ({
        url: '/schedules',
        method: 'post',
        data: newSpendingMoney,
      }),
      invalidatesTags: (result, error, { startDate }) => {
        if (startDate) {
          const { year, month } = getYearMonthFromISO(startDate);
          return [{ type: 'Schedule', id: `${year}/${month}` }];
        }
        return ['Schedule'];
      },
    }),
  }),
});

export const {
  useGetSpendingMoneyForChartQuery,
  useGetSpendingMoneyQuery,
  usePostSpendingMoneyMutation,
  useUpdateSpendingMoneyMutation,
  useDeleteSpendingMoneyMutation,
  usePostTargetMonthSpendingMutation,
  useUpdateTargetMonthSpendingMutation,
  useDeleteTargetMonthSpendingMutation,
  useGetScheduleQuery,
  usePostScheduleMutation,
} = calendarApi;
