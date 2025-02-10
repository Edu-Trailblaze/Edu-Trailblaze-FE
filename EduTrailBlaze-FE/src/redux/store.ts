import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import type { TypedUseSelectorHook } from 'react-redux'

// import { rtkQueryErrorLogger } from './middleware'
import { useDispatch, useSelector } from 'react-redux'
import courseReducer from './slice/course.slice'
import { courseApi } from '../services/courseDetail.service'
import { lectureApi } from '../services/lecture.service'
import { sectionApi } from '../services/section.service'

export const store = configureStore({
  reducer: {
    //add more reducers here

    //createSlice
    course: courseReducer,

    //createApi
    [courseApi.reducerPath]: courseApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(courseApi.middleware, lectureApi.middleware, sectionApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
