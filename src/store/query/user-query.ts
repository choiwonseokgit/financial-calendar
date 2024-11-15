import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axios-base-query';

interface UserResponse {
  id: number;
  nickname: string;
  profileImage?: string;
  kakaoId: string;
  createdAt: string;
  updatedAt: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, void>({
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
