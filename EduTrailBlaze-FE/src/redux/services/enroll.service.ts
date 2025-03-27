import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomError } from '../../utils/helpers'
import { BASE_URL } from '../../utils/config'

export const enrollApi = createApi({
  reducerPath: 'Enrollment/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Enrolls'],
  endpoints: (build) => ({
    getCheckCourseStatus: build.query<EnrollCourseStatus, Omit<EnrollCourseStatus, 'status'>>({
      query: ({ courseId, studentId }) => ({
        url: `Enrollment/check-course-status`,
        method: 'GET',
        params: { courseId, studentId }
      }),
      providesTags: ['Enrolls']
    }),

    postEnroll: build.mutation<any, PostEnroll>({
      query: (body) => ({
        url: `Enrollment`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Enrolls']
    }),

    //new
    getStudentCourseProgress: build.query<Progress, { studentId: string; courseId: number }>({
      query: ({ studentId, courseId }) => ({
        url: `Enrollment/student-course-progress`,
        method: 'GET',
        // Chú ý viết hoa chữ "S" và "C" giống như Swagger yêu cầu
        params: { StudentId: studentId, CourseId: courseId }
      })
    })
  })
})

export const {
  useGetCheckCourseStatusQuery,
  usePostEnrollMutation,
  useLazyGetCheckCourseStatusQuery,
  useGetStudentCourseProgressQuery
} = enrollApi
