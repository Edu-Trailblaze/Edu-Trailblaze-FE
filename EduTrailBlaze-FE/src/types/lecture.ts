interface SectionLecture {
  sectionId: number
  lectures: ILecture[]
}

interface ILecture {
  sectionId: number | null
  title: string
  content: string
  duration: string
  description: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  id: number
  type: LectureType
}
enum LectureType {
  Reading = 'Reading',
  Video = 'Video',
  Quiz = 'Quiz'
}
interface ISection {
  courseId: number
  title: string
  description: string
  numberOfLectures: number
  duration: string
  id: number
}
