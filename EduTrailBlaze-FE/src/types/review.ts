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

export interface RatingDetail {
  rating: number
  totalRatings: number
}