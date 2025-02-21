import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../utils/config'
import build from 'next/dist/build'

const reviewApi = createApi({
  reducerPath: 'review/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Reviews'],
  endpoints: (build) => ({
    getReviewPaging: build.query<ReviewPaging, ReviewQuery>({
      query: (params) => ({
        url: 'Review/get-paging-review',
        method: 'GET',
        params
      }),
      providesTags: ['Reviews']
    })
  })
})
