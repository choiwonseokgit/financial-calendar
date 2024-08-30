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
      transformResponse: (data: UserResponse[]) => data[0],
      providesTags: ['User'],
      keepUnusedDataFor: Infinity,
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'post',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(userApi.util.resetApiState());
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useLogoutMutation } =
  userApi;
