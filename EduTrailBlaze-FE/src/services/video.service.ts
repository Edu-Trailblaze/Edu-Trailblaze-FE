import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/config';

export const videoApi = createApi({
  reducerPath: 'video/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Videos'],
  endpoints: (build) => ({
    getVideo: build.query<IVideo, number>({
      query: (id) => ({
        url: `Video/${id}`,
        method: 'GET'
      })
    }),
  })
})


export const { useGetVideoQuery } = videoApi
