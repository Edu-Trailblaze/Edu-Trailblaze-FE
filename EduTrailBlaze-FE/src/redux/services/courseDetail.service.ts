import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomError } from '../../utils/helpers'
import { BASE_URL } from '../../utils/config'

export const courseApi = createApi({
  reducerPath: 'course/api', //tên field trong reduce state
  // keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
    // prepareHeaders(headers) {
    //   headers.set('authorization', `Bearer ${token}`)
    //   return headers
    // }
  }),
  tagTypes: ['Courses'],
  endpoints: (build) => ({
    getAllCourses: build.query<ICourseSuggestions[], void>({
      query: () => 'Course',
      providesTags(result) {
        return result
          ? [...result.map(({ id }) => ({ type: 'Courses', id }) as const), { type: 'Courses', id: 'LIST' }]
          : [{ type: 'Courses', id: 'LIST' }]
      }
    }),

    addCourse: build.mutation<CreateCourseResponse, FormData>({
      query(body) {
        try {
          return {
            url: 'Course',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Courses', id: 'LIST' }])
    }),

    getCourseDetails: build.query<ICourseFull, number>({
      query: (id) => ({
        url: `Course/get-course-detail/${id}`,
        method: 'GET'
      })
    }),

    getCourse: build.query<ICourseDetails, number>({
      query: (id) => ({
        url: `Course/${id}`,
        method: 'GET'
      })
    }),

    // updateCourse: build.mutation<ICourse, { id: string; body: ICourse }>({
    //   query(data) {
    //     return {
    //       url: `courses/${data.id}`,
    //       method: 'PUT',
    //       body: data.body
    //     }
    //   },
    //   invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Courses', id: data.id }])
    // }),

    // deleteCourse: build.mutation<{}, string>({
    //   query(id) {
    //     return {
    //       url: `courses/${id}`,
    //       method: 'DELETE'
    //     }
    //   },
    //   invalidatesTags: (result, error, id) => (error ? [] : [{ type: 'Courses', id }])
    // })

    getInstructorOfCourse: build.query<ICourseInstructor[], number>({
      query: (id) => ({
        url: `Course/get-instructors-of-a-course?courseId=${id}`
      })
    }),

    getCourseByIdAndTag: build.query<ICourseSuggestions[], { tagId: number; studentId: string }>({
      query: ({ tagId, studentId }) => ({
        url: `Course/get-courses-by-condition?TagId=${tagId}&StudentId=${studentId}`
      })
    }),
    getCourseByIdAndTagPaging: build.query<
      CourseResponseData,
      { tagId: number; studentId: string; pageIndex: number; pageSize: number }
    >({
      query: ({ tagId, studentId, pageIndex, pageSize }) => ({
        url: `Course/get-paging-course-information?TagId=${tagId}&StudentId=${studentId}&PageIndex=${pageIndex}&PageSize=${pageSize}`
      })
    }),
    getCoursePaging: build.query<CourseResponseData, CourseSearchRequest>({
      query: ({ ...params }) => ({
        url: `Course/get-paging-course-information`,
        params: {
          ...params
        }
      })
    }),
    getInstructorCoursePaging: build.query<InstructorCourseResponseData, InstructorCourseSearchRequest>({
      query: ({ ...params }) => ({
        url: `Course/get-paging-course-completion-percentage`,
        params: {
          ...params
        }
      })
    })
  })
})

export const {
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useGetCourseDetailsQuery,
  useGetCourseQuery,
  // useUpdateCourseMutation,
  // useDeleteCourseMutation
  useGetInstructorOfCourseQuery,
  useGetCourseByIdAndTagQuery,
  useGetCourseByIdAndTagPagingQuery,
  useGetCoursePagingQuery,
  useGetInstructorCoursePagingQuery
} = courseApi
