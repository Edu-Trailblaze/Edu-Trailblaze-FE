export interface Instructor {
  id: number
  courseId: number
  instructorId: string
  isPrimaryInstructor: boolean
  createdAt: string
}

export interface IInstructor {
  currentData: number
  comparisonData: number
}

export interface IEInstructor {
  //interface for /api/Enrollment/get-student-learning-courses
  id: string
  fullname: string
  profilePictureUrl: string
  userName: string
  email: string
}
