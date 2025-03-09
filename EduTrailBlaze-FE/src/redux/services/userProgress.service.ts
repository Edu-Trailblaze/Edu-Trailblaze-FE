import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'

export const userProgressApi = createApi({
  reducerPath: 'userProgress/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['UserProgress'],
  endpoints: (build) => ({
    postUserProgress: build.mutation<any, PostUserProgress>({
      query: (body) => ({
        url: `UserProgress`,
        method: 'POST',
        body
      })
    }),
    getUserProgress: build.query<UserProgressResponse, UserProgress>({
      query: ({ userId, lectureId, quizId, sectionId }) => ({
        url: `UserProgress/get-user-progress`,
        method: 'GET',
        params: {
          userId,
          lectureId,
          quizId,
          sectionId
        }
      })
    })
  })
})

export const { usePostUserProgressMutation, useGetUserProgressQuery } = userProgressApi
