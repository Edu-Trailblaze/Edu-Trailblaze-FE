import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'

export const enrollmentApi = createApi({
  reducerPath: 'enrollment/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Enrollment'],
  endpoints: (build) => ({
    getMyLearningCourseByTag: build.query<IMyLearningData, { StudentId: string; TagId: any }>({
      query: ({ StudentId, TagId }) => ({
        url:
          typeof TagId === 'number'
            ? `Enrollment/get-student-learning-courses?StudentId=${StudentId}&TagId=${TagId}`
            : `Enrollment/get-student-learning-courses?StudentId=${StudentId}`,
        method: 'GET'
      })
    }),
    getAllMyLearningCourse: build.query<IMyLearningData, { StudentId: string }>({
      query: ({ StudentId }) => ({
        url: `Enrollment/get-student-learning-courses?StudentId=${StudentId}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetMyLearningCourseByTagQuery, useGetAllMyLearningCourseQuery } = enrollmentApi
