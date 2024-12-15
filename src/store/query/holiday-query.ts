/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from './axios-base-query';

interface Holiday {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
}

export interface HolidayResponse {
  holidays: Holiday | Holiday[] | null;
}

export const holidayApi = createApi({
  reducerPath: 'holidayApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getHoliday: builder.query<HolidayResponse, { year: string; month: string }>(
      {
        query: ({ year, month }) => ({
          url: `/holidays?month=${month}&year=${year}`,
          method: 'get',
        }),
        keepUnusedDataFor: Infinity, //기본 60초
      },
    ),
  }),
});

export const { useGetHolidayQuery } = holidayApi;
