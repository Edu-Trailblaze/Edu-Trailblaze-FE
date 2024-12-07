import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../types/blog.type'
import { CustomError } from '../utils/helpers'


export const blogApi = createApi({
  reducerPath: 'blog/api', //tên field trong reduce state
  //keepUnusedDataFor: 10, setting tg caching default là 60
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    // prepareHeaders(headers) {
    //   headers.set('authorization', `Bearer ${token}`)
    //   return headers
    // }
  }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts', //method k có argment
      providesTags(result) {
        return result
          ? [...result.map(({ id }) => ({ type: 'Posts', id } as const)), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }]
      }
    }),

    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        try {
          return {
            url: 'posts',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Posts', id: 'LIST' }])
    }),

    getPost: build.query<Post, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'GET',
        headers: {
          hello: 'aaaaaaaaaaaaaaaaaaaaaaaaaa'
        },
        params: {
          first_name: 'dat',
          'last-name': 'tran'
        }
      })
    }),

    updatePost: build.mutation<Post, { id: string; body: Post }>({
      query(data) {
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts', id: data.id }])
    }),

    deletePost: build.mutation<{}, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => (error ? [] : [{ type: 'Posts', id }])
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } =
  blogApi
