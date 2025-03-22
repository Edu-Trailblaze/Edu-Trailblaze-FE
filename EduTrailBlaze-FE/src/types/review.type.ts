interface ReviewCourse {
  averageRating: number
  totalRatings: number
}

interface Review {
  courseId: number
  userId: string
  rating: number
  reviewText: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  id: number
}

interface ReviewPaging {
  items: Review[]
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

interface ReviewQuery {
  courseId?: number
  userId?: string
  reviewText?: string
  minRating?: number
  maxRating?: number
  isDeleted?: boolean
  pageIndex?: number
  pageSize?: number
  sort?: string
  sortDirection?: string
}
interface RatingDetail {
  rating: number
  ratingPercentage: number
  totalRatings: number
}

// for review component
interface ReviewProps {
  courseDetails: ICourseDetails
  courseId: number
}


interface ReviewInfo {
  averageRating: number
  totalRatings: number
  // Nếu API trả về thêm trường khác, bạn khai báo ở đây
}