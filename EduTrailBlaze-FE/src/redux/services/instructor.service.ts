import { DataPoint, IInstructor, TopCourse } from '@/types/instructor.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const instructorApi = createApi({
  reducerPath: 'instructor/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-trailblaze.azurewebsites.net/api/'
  }),
  tagTypes: ['Instructor'],
  endpoints: (build) => ({
    getInstructorCourses: build.query<IInstructor, { InstructorId: string; Time: string }>({
      query: ({ InstructorId, Time }) => ({
        url: `InstructorDashboard/get-total-courses?InstructorId=${InstructorId}&Time=${Time}`
      })
    }),
    getInstructorEnrollments: build.query<IInstructor, { InstructorId: string; Time: string }>({
      query: ({ InstructorId, Time }) => ({
        url: `InstructorDashboard/get-total-enrollments?InstructorId=${InstructorId}&Time=${Time}`
      })
    }),
    getInstructorRevenue: build.query<IInstructor, { InstructorId: string; Time: string }>({
      query: ({ InstructorId, Time }) => ({
        url: `InstructorDashboard/get-total-revenue?InstructorId=${InstructorId}&Time=${Time}`
      })
    }),
    getInstructorRating: build.query<IInstructor, { InstructorId: string; Time: string }>({
      query: ({ InstructorId, Time }) => ({
        url: `InstructorDashboard/get-avarage-rating?InstructorId=${InstructorId}&Time=${Time}`
      })
    }),
    getCourseCompletionRate: build.query<number, string>({
      query: (instructorId) => ({
        url: `InstructorDashboard/get-course-completion-rate?instructorId==${instructorId}`
      })
    }),
    getEnrollmentData: build.query<DataPoint[], { InstructorId: string; Time: string }>({
      query: ({ InstructorId, Time }) => ({
        url: `InstructorDashboard/get-nearest-time-for-enrollments?InstructorId=${InstructorId}&Time=${Time}`
      })
    }),
    getRevenueData: build.query<DataPoint[], { InstructorId: string; Time: string }>({
      query: ({ InstructorId, Time }) => ({
        url: `InstructorDashboard/get-nearest-time-for-revenue?InstructorId=${InstructorId}&Time=${Time}`
      })
    }),
    getTopCourse: build.query<TopCourse[], { InstructorId: string; top: number }>({
      query: ({ InstructorId, top }) => ({
        url: `InstructorDashboard/get-top-performing-courses?instructorId=${InstructorId}&top=${top}`
      })
    }),
  })
})

export const {
  useGetInstructorCoursesQuery,
  useGetInstructorEnrollmentsQuery,
  useGetInstructorRatingQuery,
  useGetInstructorRevenueQuery,
  useGetCourseCompletionRateQuery,
  useGetEnrollmentDataQuery,
  useGetRevenueDataQuery,
  useGetTopCourseQuery
} = instructorApi
