/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OPEN_API_KEY = process.env.REACT_APP_OPEN_API_KEY;

interface Holiday {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
}

export interface HolidayResponse {
  item: Holiday | Holiday[];
}

export const holidayApi = createApi({
  reducerPath: 'holidayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${OPEN_API_KEY}&`,
  }),
  endpoints: (builder) => ({
    getHoliday: builder.query<
      HolidayResponse | string,
      { year: string; month: string }
    >({
      query: ({ year, month }) =>
        `&solYear=${year}&solMonth=${month}&_type=json`,
      transformResponse: (data: any) => data.response.body.items,
      keepUnusedDataFor: 300, //기본 60초
    }),
  }),
});

export const { useGetHolidayQuery, useLazyGetHolidayQuery } = holidayApi;
