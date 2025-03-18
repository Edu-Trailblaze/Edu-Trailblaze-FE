import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const paymentApi = createApi({
  reducerPath: 'payment/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-trailblaze.azurewebsites.net/api/',
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
