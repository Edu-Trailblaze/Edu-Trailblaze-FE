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
  id: number
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
  approvalStatus: string
  createdAt: string
  estimatedCompletionTime: number
  updatedAt: string
  prerequisites?:string
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
  introURL?:string
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
  updatedBy?: string;      

}

interface CourseDetails {
  course: Course
  tags: Tag[]
  review: ReviewCourse
  instructors: IEInstructor[]
  enrollment: Enrollment
}

interface InstructorCourseDetails {
  courseId: number
  courseName: string
  courseImage: string
  completionPercentage: number
  createdAt: string
  status: string
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

interface InstructorCourseResponseData {
  items: InstructorCourseDetails[]
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

interface InstructorCourseSearchRequest {
  CourseId?: number
  InstructorId?: string
  CourseName?: string
  isCompleted?: boolean
  PageIndex?: number
  PageSize?: number
  Sort?: string
  SortDirection?: string
  TagId?: number
}

interface GetCourseById {
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
  hasAtLeastLecture: number
  hasVideo: boolean
  hasQuiz: boolean
  hasDoc: boolean
  isDeleted: boolean
  approvalStatus: 'Pending' | 'Approved' | 'Rejected'
  createdAt: string
  updatedAt: string
}

interface RecommendCourse {
  courseSectionInformation: ICourseFull
  recommendedCourses: IRecommendedCourse[]
}
interface IRecommendedCourse {
  course: ICourseDetails
  tags: Tag[]
  review: ReviewCourse
  instructors: IEInstructor[]
  enrollment: Enrollment
}

interface CourseCreate  {
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


type CourseApprovalStatus = 'Approved' | 'Rejected' | 'Pending'

interface ApproveCourseRequest {
  courseId: number
  status: CourseApprovalStatus
}