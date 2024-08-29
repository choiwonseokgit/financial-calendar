import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axios-base-query';

export const logoutApi = createApi({
  reducerPath: 'logoutApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/logout' }),
  tagTypes: ['Logout'],
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '',
        method: 'post',
      }),
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;
