import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sectionApi = createApi({
  reducerPath: 'section/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-trailblaze.azurewebsites.net/api/'
  }),
  tagTypes: ['Sections'],
  endpoints: (build) => ({
    getAllSections: build.query<ISection[], void>({
      query: () => 'Section',
      providesTags(result) {
        return result
          ? [...result.map(({ courseId }) => ({ type: 'Sections', courseId }) as const), { type: 'Sections', id: 'LIST' }]
          : [{ type: 'Sections', id: 'LIST' }]
      }
    }),

    getSection: build.query<ISection, number>({
      query: (id) => ({
        url: `Section/${id}`,
        method: 'GET'
      })
    }),
  })
})

export const { useGetAllSectionsQuery, useGetSectionQuery } = sectionApi