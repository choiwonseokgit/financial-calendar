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

interface spendingMoneyApiResponse {
  targetDateSpendingMoney: TSpendingMoney[];
  total: number;
}

export const spendingMoneyApi = createApi({
  reducerPath: 'spendingMoneyApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/spending-moneys' }),
  tagTypes: ['SpendingMoney'],
  endpoints: (builder) => ({
    getSpendingMoney: builder.query<
      spendingMoneyApiResponse,
      { year: string; month: string }
    >({
      query: ({ month, year }) => ({
        url: `?month=${month}&year=${year}`,
        method: 'get',
      }),
      providesTags: ['SpendingMoney'],
      keepUnusedDataFor: 300,
    }),

    postSpendingMoney: builder.mutation<
      TSpendingMoney,
      Partial<TSpendingMoney>
    >({
      query: (newSpendingMoney) => ({
        url: '',
        method: 'post',
        data: newSpendingMoney,
      }),
      invalidatesTags: ['SpendingMoney'],
    }),
  }),
});

export const { useLazyGetSpendingMoneyQuery, usePostSpendingMoneyMutation } =
  spendingMoneyApi;
