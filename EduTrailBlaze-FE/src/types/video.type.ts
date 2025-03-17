interface IVideo {
  lectureId: number | null
  title: string
  videoUrl: string
  duration: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  transcript: string
  id: number
}

interface PostVideo {
  File: File
  LectureId: number
  Title: string
}
interface VideoResponse {
  id: number
  lectureId: number
  title: string
  videoUrl: string
  duration: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
