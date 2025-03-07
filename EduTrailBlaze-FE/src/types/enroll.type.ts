interface EnrollCourseStatus {
  studentId: string
  courseId: number
  status: EnrollStatus
}

type EnrollStatus = 'Not enrolled' | 'Not bought'

interface PostEnroll {
  courseId: number
  studentId: string
}
