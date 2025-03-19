import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'

export const tagApi = createApi({
  reducerPath: 'tag/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Tags'],
  endpoints: (build) => ({
    getTag: build.query<ITag[], void>({
      query: () => ({
        url: `Tag`,
        method: 'GET',
      })
    }),
    getInstructorSpecialties: build.query<InstructorSpecialties, string>({
      query: (userId) => ({
        url: `UserTag/GetUserTagByUserId/${userId}`,
        method: 'GET',
      })
    }),
    postTag: build.mutation<any, { userId: string; tagId: number[]}>({
      query: (body) => ({
        url: `UserTag/AddOrUpdateTags`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Tags']
    }),
  })
})

export const { useGetTagQuery, useGetInstructorSpecialtiesQuery,usePostTagMutation } = tagApi
