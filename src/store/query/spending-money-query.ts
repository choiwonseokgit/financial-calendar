import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axios-base-query';

export interface TSpendingMoney {
  id: number;
  spentMoney: string;
  category: string;
  date: string;
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

export interface spendingMoneyApiResponse {
  targetMonthSpending: TTargetMonthSpending | null;
  targetDateSpendingMoney: TSpendingMoney[];
  total: number;
}

export const spendingMoneyApi = createApi({
  reducerPath: 'spendingMoneyApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  tagTypes: ['SpendingMoney'],
  endpoints: (builder) => ({
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
      invalidatesTags: ['SpendingMoney'],
    }),

    /****************tartget-month-spending*******************/
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
  }),
});

export const {
  useGetSpendingMoneyQuery,
  useLazyGetSpendingMoneyQuery,
  usePostSpendingMoneyMutation,
  usePostTargetMonthSpendingMutation,
  useUpdateTargetMonthSpendingMutation,
  useDeleteTargetMonthSpendingMutation,
} = spendingMoneyApi;
