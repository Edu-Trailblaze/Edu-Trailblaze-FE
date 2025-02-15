import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'user/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://edu-trailblaze.azurewebsites.net/api/'
    }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query<IUser, string>({
            query: (id) => ({
                url: `User/${id}`
            })
        }),
        getUserProfile: build.query<IUserProfile, string>({
            query: (id) => ({
                url: `UserProfile/${id}`
            })
        })
    })
})

export const {
    useGetUserQuery,
    useGetUserProfileQuery
} = userApi