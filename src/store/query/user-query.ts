import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from './axios-base-query';

import type { User } from '@/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: '/users',
        method: 'get',
      }),
      providesTags: ['User'],
      keepUnusedDataFor: Infinity,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
