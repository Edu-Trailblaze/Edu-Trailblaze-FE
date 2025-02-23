import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://edu-trailblaze.azurewebsites.net/api' // Thay bằng URL thật của bạn

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/Auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/Auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = authApi
