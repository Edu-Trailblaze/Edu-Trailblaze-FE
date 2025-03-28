interface Progress {
  lastAccessed: string
  progressPercentage: number
  remainingDurationInMins: number
}

interface CourseStatus {
  status: 'Enrolled'
}

interface IECourse {
  id: number
  title: string
  imageURL: string
  tags: IETag[]
  review: ReviewCourse
  instructors: IEInstructor[]
  progress: Progress
  courseStatus: CourseStatus
}

interface IEInstructor {
  id: string
  fullname: string
  profilePictureUrl: string
  userName: string
  email: string
}

interface IMyLearningData {
  tags: IETag[]
  courses: IECourse[]
}

interface Enrollment {
  totalEnrollments: number
}

type TopStudentEnrollment = {
  rank: number
  userName: string
  email: string
  fullName: string
  phoneNumber?: string
  totalEnrollments: number
}


interface TotalEnrollmentsResponse {
  statusCode: number;
  data: number;
}

interface NearestTimeEnrollment {
  fromDate: string
  toDate: string
  data: number
}

interface TotalRevenueResponse {
  statusCode: number;
  data: number;
}

interface NearestTimeRevenue {
  fromDate: string;
  toDate: string;
  data: number;
}
