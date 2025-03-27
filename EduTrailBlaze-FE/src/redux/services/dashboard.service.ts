import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/utils/config'

export const dashboardApi = createApi({
  reducerPath: 'dashboard/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // GET /api/AdminDashboard/number-of-instructors
    getNumberOfInstructors: builder.query<number, void>({
      query: () => 'AdminDashboard/number-of-instructors'
    }),
 
    // GET /api/AdminDashboard/number-of-students
    getNumberOfStudents: builder.query<number, void>({
      query: () => 'AdminDashboard/number-of-students'
    }),

    // GET /api/AdminDashboard/total-revenue
    getTotalRevenue: builder.query<number, void>({
      query: () => 'AdminDashboard/total-revenue'
    }),

    // GET /api/AdminDashboard/total-courses-bought
    getTotalCoursesBought: builder.query<number, void>({
      query: () => 'AdminDashboard/total-courses-bought'
    }),

    getPendingCourses: builder.query<PendingCoursesResponse, { pageIndex?: number; pageSize?: number }>({
      query: ({ pageIndex = 1, pageSize = 10 }) => ({
        url: `AdminDashboard/pending-courses`,
            method: 'GET',
            params: {
              pageIndex,
              pageSize
            }
          })
        }),

    getTopSaleCourses: builder.query<TopSaleCourse[], void>({
      query: () => 'Course/get-top-5-best-selling-courses'
    }),

    getTopStudentsEnrollment: builder.query<TopStudentEnrollment[], void>({
      query: () => 'Enrollment/top-5-students-with-most-enrollments'
    }),
  })
})


export const {
  useGetNumberOfInstructorsQuery,
  useGetNumberOfStudentsQuery,
  useGetTotalRevenueQuery,
  useGetTotalCoursesBoughtQuery,
  useGetPendingCoursesQuery,
  useGetTopSaleCoursesQuery,
  useGetTopStudentsEnrollmentQuery
} = dashboardApi
