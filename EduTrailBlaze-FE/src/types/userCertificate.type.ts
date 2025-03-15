// redux/types/userCertificate.type.ts

// Dữ liệu yêu cầu gửi lên API
export interface IUserCertificateRequest {
    CourseId: number
    UserId: string
    FromDate?: string  
    ToDate?: string    
  }
  
  // Dữ liệu chứng chỉ trả về từ API
  // Tuỳ vào cấu trúc JSON trả về, bạn thêm/bớt field cho phù hợp
  export interface IUserCertificate {
    id: number
    certificateUrl: string
    issuedAt: string
    courseId: number
    userId: string 
    // ... thêm các field khác nếu API có
  }
  