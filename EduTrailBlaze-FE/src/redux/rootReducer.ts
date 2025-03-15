import { combineReducers } from '@reduxjs/toolkit'
import courseReducer from './slice/course.slice'
import cartReducer from './slice/cart.slice'
import filterReducer from './slice/filter.slice'
import { courseApi } from './services/courseDetail.service'
import { authApi } from './services/auth.service'
import { lectureApi } from './services/lecture.service'
import { sectionApi } from './services/section.service'
import { userApi } from './services/user.service'
import { videoApi } from './services/video.service'
import { cartApi } from './services/cart.service'
import { paymentApi } from './services/payment.service'
import { reviewApi } from './services/review.service'
import { persistedAuthReducer, persistedFilterReducer, persistedSortReducer } from './persistConfig'
import { quizApi } from './services/quiz.service'
import { instructorApi } from './services/instructor.service'
import { tagApi } from './services/tag.service'

import { enrollmentApi } from './services/enrollment.service'

import { enrollApi } from './services/enroll.service'
import { userProgressApi } from './services/userProgress.service'
import { userCertificateApi } from './services/userCertificate.service'

export const rootReducer = combineReducers({
  // Slice reducers
  course: courseReducer,
  auth: persistedAuthReducer,
  cart: cartReducer,
  filter: persistedFilterReducer,
  sort: persistedSortReducer,

  // API reducers
  [courseApi.reducerPath]: courseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [lectureApi.reducerPath]: lectureApi.reducer,
  [sectionApi.reducerPath]: sectionApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [videoApi.reducerPath]: videoApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [quizApi.reducerPath]: quizApi.reducer,
  [instructorApi.reducerPath]: instructorApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,

  [enrollmentApi.reducerPath]: enrollmentApi.reducer,
  [userProgressApi.reducerPath]: userProgressApi.reducer,
  [enrollApi.reducerPath]: enrollApi.reducer,

  [userCertificateApi.reducerPath]:userCertificateApi.reducer


})
