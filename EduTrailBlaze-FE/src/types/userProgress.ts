interface PostUserProgress {
  userId: string
  lectureId: number
}

interface UserProgress {
  userId: string
  sectionId?: number
  lectureId?: number
  quizId?: number
}

interface UserProgressResponse {
  userId: string
  courseClassId: number
  lectureId: number
  progressType: string
  progressPercentage: number
  isCompleted: boolean
  lastAccessed: string
  createAt: string
  updatedAt: string
  id: number
}
