import { Middleware } from '@reduxjs/toolkit'
import { courseApi } from './services/courseDetail.service'
import { courseTagApi } from './services/courseTag.service'
import { authApi } from './services/auth.service'
import { lectureApi } from './services/lecture.service'
import { sectionApi } from './services/section.service'
import { userApi } from './services/user.service'
import { videoApi } from './services/video.service'
import { cartApi } from './services/cart.service'
import { paymentApi } from './services/payment.service'
import { reviewApi } from './services/review.service'
import { quizApi } from './services/quiz.service'
import { instructorApi } from './services/instructor.service'
import { tagApi } from './services/tag.service'

import { enrollmentApi } from './services/enrollment.service'

import { enrollApi } from './services/enroll.service'
import { userProgressApi } from './services/userProgress.service'

import { userCertificateApi } from './services/userCertificate.service'
import { orderApi } from './services/order.service'
import { dashboardApi } from './services/dashboard.service'

export const apiMiddlewares: Middleware[] = [
  courseApi.middleware,
  courseTagApi.middleware,
  authApi.middleware,
  lectureApi.middleware,
  sectionApi.middleware,
  userApi.middleware,
  videoApi.middleware,
  cartApi.middleware,
  paymentApi.middleware,
  reviewApi.middleware,
  quizApi.middleware,
  instructorApi.middleware,
  tagApi.middleware,

  enrollmentApi.middleware,
  userProgressApi.middleware,
  enrollApi.middleware,

  userCertificateApi.middleware,
  orderApi.middleware,
  dashboardApi.middleware
]
