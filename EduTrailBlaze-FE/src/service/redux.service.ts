import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomError } from '../utils/helpers'

export const courseApi = createApi({
  reducerPath: 'course/api', //tên field trong reduce state
  //keepUnusedDataFor: 10, setting tg caching default là 60
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4001/'
    // prepareHeaders(headers) {
    //   headers.set('authorization', `Bearer ${token}`)
    //   return headers
    // }
  }),
  tagTypes: ['Courses'],
  endpoints: (build) => ({
    getCourses: build.query<Course[], void>({
      query: () => 'course',
      providesTags(result) {
        return result
          ? [...result.map(({ courseId }) => ({ type: 'Courses', courseId }) as const), { type: 'Courses', id: 'LIST' }]
          : [{ type: 'Courses', id: 'LIST' }]
      }
    }),

    addCourse: build.mutation<Course, Omit<Course, 'id'>>({
      query(body) {
        try {
          return {
            url: 'courses',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Courses', id: 'LIST' }])
    }),

    getCourse: build.query<Course, string>({
      query: (id) => ({
        url: `course/${id}`,
        method: 'GET',
        headers: {
          hello: 'aaaaaaaaaaaaaaaaaaaaaaaaaa'
        },
        params: {
          first_name: 'dat',
          'last-name': 'tran'
        }
      })
    }),

    updateCourse: build.mutation<Course, { id: string; body: Course }>({
      query(data) {
        return {
          url: `courses/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Courses', id: data.id }])
    }),

    deleteCourse: build.mutation<{}, string>({
      query(id) {
        return {
          url: `courses/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => (error ? [] : [{ type: 'Courses', id }])
    })
  })
})

export const {
  useGetCoursesQuery,
  useAddCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation
} = courseApi
