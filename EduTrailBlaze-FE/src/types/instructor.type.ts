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

export interface DataPoint {
  fromDate: string; // ISO 8601 date-time string
  toDate: string;   // ISO 8601 date-time string
  data: number;
}

export interface TopCourse {
  title: string, 
  numberOfStudents: number,
  revenue: number,
  rating: number
}