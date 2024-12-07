import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { rtkQueryErrorLogger } from './middleware'
import { useDispatch } from 'react-redux'
import { blogApi } from '../service/redux.service'
import blogReducer from '../components/test-redux/blog.slice'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer //thêm reducer được tạo từ api slice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
