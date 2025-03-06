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
  })
})

export const { useGetTagQuery  } = tagApi
