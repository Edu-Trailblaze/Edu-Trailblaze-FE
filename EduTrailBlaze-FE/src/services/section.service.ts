import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../utils/config'

export const sectionApi = createApi({
  reducerPath: 'section/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Sections'],
  endpoints: (build) => ({
    getAllSections: build.query<ISection[], void>({
      query: () => 'Section',
      providesTags(result) {
        return result
          ? [
              ...result.map(({ courseId }) => ({ type: 'Sections', courseId }) as const),
              { type: 'Sections', id: 'LIST' }
            ]
          : [{ type: 'Sections', id: 'LIST' }]
      }
    }),

    getSection: build.query<ISection, number>({
      query: (id) => ({
        url: `Section/${id}`,
        method: 'GET'
      })
    }),

    getSectionbyConditions: build.query<ISection[], number>({
      query: (courseId) => ({
        url: `Section/cget-sections-by-conditions?CourseId=${courseId}`,
        method: 'GET'
      })
    })
  })
})

export const { useGetAllSectionsQuery, useGetSectionQuery, useGetSectionbyConditionsQuery } = sectionApi
