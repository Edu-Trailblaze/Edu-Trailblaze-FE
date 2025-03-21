import { BASE_URL } from '@/utils/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
  reducerPath: 'order/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
    responseHandler: (response) => response.text().then((text) => ({ data: text }))
  }),
  tagTypes: ['Order'],
  endpoints: (build) => ({
    postPayment: build.mutation<any, { userId: string; paymentMethod: string }>({
      query: (body) => ({
        url: `Order/place-order`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Order']
    }),
  })
})

export const { usePostPaymentMutation } = orderApi
