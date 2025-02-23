import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const paymentApi = createApi({
  reducerPath: 'payment/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-trailblaze.azurewebsites.net/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
    responseHandler: (response) => response.text().then((text) => ({ data: text }))
  }),
  tagTypes: ['Payment'],
  endpoints: (build) => ({
    postPayment: build.mutation<any, { userId: string; paymentMethod: string }>({
      query: (body) => ({
        url: `Order/place-order`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Payment']
    })
  })
})

export const { usePostPaymentMutation } = paymentApi
