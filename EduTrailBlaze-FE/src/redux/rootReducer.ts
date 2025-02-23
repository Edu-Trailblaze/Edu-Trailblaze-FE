import { combineReducers } from "@reduxjs/toolkit";
import courseReducer from './slice/course.slice';
import cartReducer from './slice/cart.slice';
import { courseApi } from './services/courseDetail.service';
import { authApi } from './services/auth.service';
import { lectureApi } from './services/lecture.service';
import { sectionApi } from './services/section.service';
import { userApi } from './services/user.service';
import { videoApi } from './services/video.service';
import { cartApi } from './services/cart.service';
import { paymentApi } from './services/payment.service';
import { reviewApi } from './services/review.service';
import { persistedAuthReducer } from './persistConfig';


export const rootReducer = combineReducers({
  // Slice reducers
  course: courseReducer,
  auth: persistedAuthReducer,
  cart: cartReducer,

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
});
