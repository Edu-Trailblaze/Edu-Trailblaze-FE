import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import type { TypedUseSelectorHook } from 'react-redux'

// import { rtkQueryErrorLogger } from './middleware'
import { useDispatch, useSelector } from 'react-redux'
import courseReducer from './slice/course.slice'
import { courseApi } from '../services/courseDetail.service'
import { lectureApi } from '../services/lecture.service'
import { sectionApi } from '../services/section.service'
import authReducer from './slice/auth.slice' // Import auth slice
import { authApi } from '@/services/auth.service'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'auth',
  storage
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    //add more reducers here

    //createSlice
    course: courseReducer,
    auth: persistedAuthReducer,

    //createApi
    [courseApi.reducerPath]: courseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Bỏ kiểm tra serialize để tránh lỗi
    }).concat(courseApi.middleware, authApi.middleware, lectureApi.middleware, sectionApi.middleware)
})

export const persistor = persistStore(store);

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
