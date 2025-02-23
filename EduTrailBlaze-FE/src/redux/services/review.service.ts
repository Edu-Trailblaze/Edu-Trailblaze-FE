import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'
import build from 'next/dist/build'
import { RatingDetail } from '../../types/review'

export const reviewApi = createApi({
  reducerPath: 'review/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Reviews'],
  endpoints: (build) => ({
    // getReviewPaging: build.query<ReviewPaging, ReviewQuery>({
    //   query: (params) => ({
    //     url: 'Review/get-paging-review',
    //     method: 'GET',
    //     params
    //   }),
    //   providesTags: ['Reviews']
    // }),
    getRatingDetail: build.query<RatingDetail, number>({
      query: (courseId) => ({
        url: 'Review/get-rating-detail',
        method: 'GET',
        params: { courseId }
      }),
      providesTags: ['Reviews']
    })
  })
})

export const { useGetRatingDetailQuery } = reviewApi