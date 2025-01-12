import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { rtkQueryErrorLogger } from './middleware'
import { useDispatch } from 'react-redux'
import courseReducer from './slice/course.slice'
import { courseApi } from '../service/redux.service'

export const store = configureStore({
  reducer: {
    course: courseReducer,
    [courseApi.reducerPath]: courseApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(courseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
