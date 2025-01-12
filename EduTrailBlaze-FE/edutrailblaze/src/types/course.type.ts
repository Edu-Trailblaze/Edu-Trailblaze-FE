

interface Intructor {
  avata: string
  name: string
  courseId: number
  learner: string
}

interface Course {
  courseId: number
  imageURL?: string
  title: string
  duration: number
  price: number
  difficultyLevel: string
  description: string
  createdBy: string
  createdAt: string
  discount: {
    discountType: string
    discountValue: number
    calculatedDiscount: number
    calculatedPrice: number
  }
  review: {
    averageRating: number
    totalRatings: number
  }
  instructors: {
    userName: string
    email: string
  }[]
  enrollment: {
    totalEnrollments: number
  }
}
