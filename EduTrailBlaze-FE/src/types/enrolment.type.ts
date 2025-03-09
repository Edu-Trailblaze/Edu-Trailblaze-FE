interface Progress {
  lastAccessed: string
  progressPercentage: number
  remainingDurationInMins: number
}

interface CourseStatus {
  status: 'Enrolled'
}

interface IECourse {
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
