import { IEInstructor } from './instructor.type'

interface Progress {
  lastAccessed: string // ISO 8601 date-time string
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

export interface IMyLearningData {
  tags: IETag[]
  courses: IECourse[]
}
