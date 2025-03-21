import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '@/utils/config'
import { CourseTag, CourseTagPayload } from '../../types/courseTag.types'

export const courseTagApi = createApi({
  reducerPath: 'courseTag/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['CourseTag'], 
  endpoints: (builder) => ({
    // GET: Lấy danh sách CourseTag
    getCourseTags: builder.query<CourseTag[], void>({
      query: () => 'CourseTag',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'CourseTag', id } as const)),
              { type: 'CourseTag', id: 'LIST' }
            ]
          : [{ type: 'CourseTag', id: 'LIST' }]
    }),

    // POST: Tạo mới CourseTag
    addCourseTag: builder.mutation<CourseTag, CourseTagPayload>({
      query: (payload) => ({
        url: 'CourseTag',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'CourseTag', id: 'LIST' }]
    })
  })
})

export const { useGetCourseTagsQuery, useAddCourseTagMutation } = courseTagApi
