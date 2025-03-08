interface IPostCart {
  message: string
}

interface CartCourseInformation {
  id: number // courseId
  title: string
  price: number
  imageURL: string
  duration: number
  difficultyLevel: string
  totalLectures: number
}

interface InstructorInformation {
  id: string
  userName: string
  email: string
  fullname?: string // Optional fullname
}

interface CourseReviewInformation {
  averageRating: number
  totalRatings: number
}

interface CartItem {
  cartCourseInformation: CartCourseInformation
  instructorInformation: InstructorInformation[] // Array of instructors
  courseReviewInformation: CourseReviewInformation
  totalCoursePrice: number
}

interface ICart {
  cartItems: CartItem[]
  totalPrice: number
}

interface ICartNumber {}
