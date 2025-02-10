import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const lectureApi = createApi({
  reducerPath: 'lecture/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-trailblaze.azurewebsites.net/api/'
  }),
  tagTypes: ['Lectures'],
  endpoints: (build) => ({
    getAllLecture: build.query<ILecture[], void>({
      query: () => 'Lecture',
      providesTags(result) {
        return result
          ? [...result.map(({ id }) => ({ type: 'Lectures', id }) as const), { type: 'Lectures', id: 'LIST' }]
          : [{ type: 'Lectures', id: 'LIST' }]
      }
    }),

    getLecture: build.query<ILecture, number>({
      query: (id) => ({
        url: `Lecture/${id}`,
        method: 'GET'
      })
    }),
  })
})

export const { useGetAllLectureQuery, useGetLectureQuery } = lectureApi