import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'

export const userProgressApi = createApi({
  reducerPath: 'userProgress/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['UserProgress'],
  endpoints: (build) => ({
    postUserProgress: build.mutation<void, UserProgress>({
      query: (body) => ({
        url: `UserProgress`,
        method: 'POST',
        body
      })
    })
  })
})

export const { usePostUserProgressMutation } = userProgressApi
