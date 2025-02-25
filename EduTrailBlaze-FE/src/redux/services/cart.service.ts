import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
  reducerPath: 'cart/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://edu-trailblaze.azurewebsites.net/api/'
  }),
  tagTypes: ['Cart'],
  endpoints: (build) => ({
    postCart: build.mutation<any, { userId: string; courseId: number }>({
      // Changed to mutation and type the input
      query: ({ userId, courseId }) => ({
        // Destructure userId and courseId from the argument
        url: `Cart/add-item-to-cart-v2?userId=${userId}&courseId=${courseId}`, // Use both IDs in the URL
        method: 'POST'
      }),
      invalidatesTags: ['Cart'] // If you have a getCart query, this will refresh it
    }),
    getCart: build.query<ICart, string>({
      query: (id) => ({
        url: `Cart/view-cart?userId=${id}`
      })
    }),
    getNumberOfCartItems: build.query<number, string>({
      query: (id) => ({
        url: `Cart/number-of-items-in-cart?userId=${id}`
      })
    }),
    deleteCartItem: build.mutation<any, { userId: string; courseId: number }>({
      query: ({ userId, courseId }) => ({
        url: `Cart/remove-item-from-cart?userId=${userId}&courseId=${courseId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    }),
    deleteAllCartItems: build.mutation<any, string>({
      query: (userId) => ({
        url: `Cart/clear-cart?userId=${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    })
  })
})

export const {
  usePostCartMutation,
  useGetCartQuery,
  useGetNumberOfCartItemsQuery,
  useDeleteCartItemMutation,
  useDeleteAllCartItemsMutation
} = cartApi
