import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'

export const quizApi = createApi({
  reducerPath: 'quiz/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Quizzes'],
  endpoints: (build) => ({
    getQuizDetail: build.query<QuizDetail, number>({
      query: (lectureId) => ({
        url: `Quiz/get-quiz-details`,
        method: 'GET',
        params: { lectureId }
      })
    })
  })
})

export const { useGetQuizDetailQuery } = quizApi
