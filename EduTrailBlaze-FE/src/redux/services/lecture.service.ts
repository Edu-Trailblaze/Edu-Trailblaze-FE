import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'

export const lectureApi = createApi({
  reducerPath: 'lecture/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
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

    getLectureByConditions: build.query<
      ILecture[],
      Partial<Omit<ILecture, 'createAt' | 'updateAt' | 'id'>> & { minDuration?: number; maxDuration?: number }
    >({
      query: (conditions) => ({ url: `Lecture/get-lectures-by-conditions`, method: 'GET', params: conditions })
    }),

    getSectionLecture: build.query<SectionLecture[], number[]>({
      query: (ids) => ({
        url: `Lecture/get-section-lecture?${ids.map((id) => `sectionIds=${id}`).join('&')}`
      })
    }),

    createSectionLectureVip: build.mutation<ResponseMessage, FormData>({
      query: (formData) => ({
        url: 'Lecture/create-section-lecture-vip',
        method: 'POST',
        body: formData
      })
    }),

    getLectureById: build.query<ILecture, number>({
      query: (lectureId) => ({
        url: `Lecture/${lectureId}`
      })
    }), 
    
    putLecture: build.mutation<any, EditLecture>({
      query: (data) => ({
        url: 'Lecture',
        method: 'PUT',
        body: data
      })
    }),
  })
})

export const {
  useGetAllLectureQuery,
  useGetLectureQuery,
  useGetLectureByConditionsQuery,
  useGetSectionLectureQuery,
  useCreateSectionLectureVipMutation,
  useGetLectureByIdQuery,
  usePutLectureMutation
} = lectureApi
