import { BASE_URL } from '@/utils/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const paymentApi = createApi({
  reducerPath: 'payment/api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Payment'],
  endpoints: (build) => ({
    getPayment: build.query<PaymentResponse, number>({
      query: (id) => ({
        url: `Payment/${id}`
      })
    }),
  })
})

export const { useGetPaymentQuery } = paymentApi
