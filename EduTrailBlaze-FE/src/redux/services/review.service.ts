import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'

export const reviewApi = createApi({
  reducerPath: 'review/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Reviews'],
  endpoints: (build) => ({
    getReviewPaging: build.query<ReviewPaging, ReviewQuery>({
      query: ({ pageIndex = 1, pageSize = 2, ...params }) => ({
        url: 'Review/get-paging-review/',
        method: 'GET',
        params: { pageIndex, pageSize, ...params }
      }),
      providesTags: ['Reviews']
    }),
    getRatingDetail: build.query<RatingDetail[], number>({
      query: (courseId) => ({
        url: `Review/get-rating-details/${courseId}`,
        method: 'GET'
      }),
      providesTags: ['Reviews']
    }),
    getReviewInfo: build.query<ReviewInfo, number>({ // <-- MỚI
         query: (courseId) => ({
           url: `Review/get-review-info/${courseId}`,
           method: 'GET'
         }),
         providesTags: ['Reviews']
       })

  })
})

export const {
  useGetRatingDetailQuery,
  useGetReviewPagingQuery,
  useGetReviewInfoQuery,       // <-- MỚI
  useLazyGetReviewInfoQuery,   // <-- MỚI
} = reviewApi
