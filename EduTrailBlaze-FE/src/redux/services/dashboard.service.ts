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

    getTotalEnrollmentsByMonth: builder.query<number, { month: number; year: number }>({
      query: ({ month, year }) => ({
        url: 'Enrollment/total-enrollment-by-month',
        method: 'GET',
        params: { month, year },
      }),
      transformResponse: (response: TotalEnrollmentsResponse) => response.data,
    }),

    getTotalRevenueByMonth: builder.query<number, { month: number; year: number }>({
      query: ({ month, year }) => ({
        url: 'Order/total-revenue-by-month',
        method: 'GET',
        params: { month, year },
      }),
      transformResponse: (response: TotalRevenueResponse) => response.data,
    }),


    getStudentCountByTag: builder.query<StudentCountByTag[], void>({
      query: () => 'Course/get-student-count-by-tag'
    }),

    getNearestTimeForRevenue: builder.query<NearestTimeRevenue[], { time: 'week' | 'month' | 'year' }>({
      query: ({ time }) => `AdminDashboard/get-nearest-time-for-revenue?Time=${time}`
    }),

    getNearestTimeForEnrollments: builder.query<NearestTimeEnrollment[], { time: 'week' | 'month' | 'year' }>({
      query: ({ time }) => `AdminDashboard/get-nearest-time-for-enrollments?Time=${time}`
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
  useGetTopStudentsEnrollmentQuery,
  useGetTotalEnrollmentsByMonthQuery,
  useGetTotalRevenueByMonthQuery,
  useGetStudentCountByTagQuery,
  useGetNearestTimeForRevenueQuery,
  useGetNearestTimeForEnrollmentsQuery
} = dashboardApi
