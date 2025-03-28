interface ITag {
  name: string
  description: string
  createdAt: string // ISO 8601 date-time string
  updatedAt: string // ISO 8601 date-time string
  id: number
}

interface IETag {
  //interface for /api/Enrollment/get-student-learning-courses
  id: number
  name: string
}

interface InstructorSpecialties {
    userId: string;
    tag: number[];
}

interface StudentCountByTag {
  tagName: string;
  studentCount: number;
}
