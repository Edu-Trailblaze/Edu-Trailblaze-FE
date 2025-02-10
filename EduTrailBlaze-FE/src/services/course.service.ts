import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CustomError } from '../utils/helpers'

export const courseApi = createApi({
  reducerPath: 'course/api', //tên field trong reduce state
  //keepUnusedDataFor: 10, setting tg caching default là 60
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-trailblaze.azurewebsites.net/api/'
    // prepareHeaders(headers) {
    //   headers.set('authorization', `Bearer ${token}`)
    //   return headers
    // }
  }),
  tagTypes: ['Courses'],
  endpoints: (build) => ({
    getCourses: build.query<ICourseSuggestions[], void>({
      query: () => 'Course',
      providesTags(result) {
        return result
          ? [...result.map(({ id }) => ({ type: 'Courses', id }) as const), { type: 'Courses', id: 'LIST' }]
          : [{ type: 'Courses', id: 'LIST' }]
      }
    }),

    // addCourse: build.mutation<ICourse, Omit<ICourse, 'id'>>({
    //   query(body) {
    //     try {
    //       return {
    //         url: 'courses',
    //         method: 'POST',
    //         body
    //       }
    //     } catch (error: any) {
    //       throw new CustomError(error.message)
    //     }
    //   },
    //   invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Courses', id: 'LIST' }])
    // }),

    getCourse: build.query<ICourseFull, number>({
      query: (id) => ({
        url: `Course/get-course-detail/${id}`,
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
  })
})

export const {
  useGetCoursesQuery,
  // useAddCourseMutation,
  useGetCourseQuery,
  // useUpdateCourseMutation,
  // useDeleteCourseMutation
} = courseApi
