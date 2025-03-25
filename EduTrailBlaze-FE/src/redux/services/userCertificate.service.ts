// // redux/services/userCertificate.service.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { BASE_URL } from '../../utils/config'
// import {IUserCertificateRequest, IUserCertificate } from '../../types/userCertificate.type'

// export const userCertificateApi = createApi({
//   reducerPath: 'userCertificate/api',
//   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
//   tagTypes: ['UserCertificate'],
//   endpoints: (build) => ({
//     getUserCertificatesByConditions: build.query<IUserCertificate[], IUserCertificateRequest>({
//       query: ({ CourseId, UserId, FromDate, ToDate }) => {
//         const params = new URLSearchParams()
//         params.append('CourseId', String(CourseId))
//         params.append('UserId', UserId)
//         if (FromDate) params.append('FromDate', FromDate)
//         if (ToDate)   params.append('ToDate', ToDate)

//         return {
//           url: `UserCertificate/get-user-certificates-by-conditions?${params.toString()}`,
//           method: 'GET'
//         }
//       }
//     })
//   })
// })

// export const { useGetUserCertificatesByConditionsQuery } = userCertificateApi

// redux/services/userCertificate.service.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/config'
import { IUserCertificateRequest, IUserCertificate } from '../../types/userCertificate.type'
 
export const userCertificateApi = createApi({
  reducerPath: 'userCertificate/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['UserCertificate'],
  endpoints: (build) => ({
    // (Nếu không còn dùng, bạn có thể xóa/ghi chú endpoint cũ)
    // getUserCertificatesByConditions: build.query<IUserCertificate[], IUserCertificateRequest>({ ... })

    // +++ Endpoint mới: trả về 1 chứng chỉ (hoặc null) +++
    getUserCertificateByConditions: build.query<IUserCertificate | null, IUserCertificateRequest>({
      query: ({ CourseId, UserId, FromDate, ToDate }) => {
        const params = new URLSearchParams()
        params.append('CourseId', String(CourseId))
        params.append('UserId', UserId)
        if (FromDate) params.append('FromDate', FromDate)
        if (ToDate)   params.append('ToDate', ToDate)

        return {
          url: `UserCertificate/get-user-certificates-by-conditions?${params.toString()}`,
          method: 'GET'
        }
      },
      // +++ Dùng transformResponse để lấy phần tử đầu +++
      transformResponse: (response: IUserCertificate[]) => {
        if (!response || response.length === 0) {
          return null // Không có chứng chỉ
        }
        return response[0] // Chỉ trả về 1 chứng chỉ đầu tiên
      }
    })
  })
})

// +++ Xuất hook mới +++
export const {
 

  useGetUserCertificateByConditionsQuery
} = userCertificateApi
