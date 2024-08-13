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

export const { useGetHolidayQuery } = holidayApi;

//https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=FzYE9rnBSKi%2FeoLVZ%2Fg3UgMnj6xgxeA9C1zuWgNgJXok75LwVrRFJj9aVgZWrAMn07XoPpg%2BBzQPlrczu1UOog%3D%3D
//&solYear=2024&solMonth=09&_type=json

/**
 * // createApi를 import하기위해 React 엔트리 포인트 사용
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

// base URL과 엔드포인트들로 서비스 정의
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const { useGetPokemonByNameQuery } = pokemonApi
 * 
 */
