interface Discount {
  discountType: string
  discountValue: number
  calculatedDiscount: number
  calculatedPrice: number
}
interface Tag {
  id: number
  name: string
}
interface Review {
  averageRating: number
  totalRatings: number
}
interface Enrollment {
  totalEnrollments: number
}
interface ICourse {
  id: number
  title: string
  imageURL: string
  introURL: string
  description: string
  price: number
  duration: number
  difficultyLevel: string
  prerequisites: string
  learningOutcomes: string[]
  estimatedCompletionTime: number
  createdBy: string
  updatedBy: string
  isPublished: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
enum DifficultyLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}
interface ICourseSuggestions {
  title: string
  imageURL: string
  introURL: string
  description: string
  price: number
  duration: number
  difficultyLevel: DifficultyLevel
  prerequisites: string
  learningOutcomes: string[]
  estimatedCompletionTime: number
  createdBy: string
  updatedBy: string
  isPublished: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  id: number
}
interface ICourseDetails {
  title: string
  description: string
  introURL: string
  imageURL: string
  tags: string[]
  instructors: Instructor[]
  review: Review
  enrollment: Enrollment
  languages: string[]
  price: number
  duration: number
  difficultyLevel: string
  learningOutcomes: string[]
  createdAt: string
  estimatedCompletionTime: number
  updatedAt: string
}
interface ICourseFull {
  courseDetails: ICourseDetails
  sectionDetails: ISection[]
}
interface ICourseInstructor {
  id: string
  userName: string
  email: string
}
