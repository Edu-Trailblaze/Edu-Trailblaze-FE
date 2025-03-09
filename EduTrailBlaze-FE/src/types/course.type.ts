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
  review: ReviewCourse
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
  courseDetails?: ICourseDetails
  sectionDetails?: ISection[]
}
interface ICourseInstructor {
  id: string
  userName: string
  email: string
}

interface CreateCourse {
  title: string
  imageURL: string
  introURL: string
  description: string
  price: number
  difficultyLevel: string
  createdBy: string
  prerequisites: string
  learningOutcomes: string[]
}

interface CreateCourseResponse {
  statusCode: number
  data: {
    courseId: number
  }
}

interface Course {
  id: number
  title: string
  imageURL: string
  description: string
  price: number
  duration: number
  difficultyLevel: string
  learningOutcomes: string[]
  prerequisites: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface CourseDetails {
  course: Course
  tags: Tag[]
  review: ReviewCourse
  instructors: IEInstructor[]
  enrollment: Enrollment
}

interface CourseResponseData {
  items: CourseDetails[]
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

interface CourseSearchRequest {
  InstructorId?: string
  LanguageId?: number
  TagId?: number
  Title?: string
  MinRating?: number
  MaxRating?: number
  MinPrice?: number
  MaxPrice?: number
  isFree?: boolean
  MinDuration?: number
  MaxDuration?: number
  HasQuiz?: boolean
  StudentId?: string
  DifficultyLevel?: string
  IsDeleted?: boolean
  PageIndex?: number
  PageSize?: number
  Sort?: string
  SortDirection?: string
}
