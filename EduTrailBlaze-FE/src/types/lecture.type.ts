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
  lectureType: LectureType
}
type LectureType = 'Reading' | 'Video' | 'Quiz'

interface ISection {
  courseId: number
  title: string
  description: string
  numberOfLectures: number
  duration: string
  id: number
}
interface IAnswer {
  answerText: string
  isCorrect: boolean
}

interface IQuestion {
  questionText: string
  answers: IAnswer[]
}

interface SectionLectureVip {
  CourseId: number | null
  Sections: SectionVip[]
}

interface SectionVip {
  id?: number // Thêm id (chỉ dùng trong React)
  title: string
  description: string
  lectures: LectureVip[]
}
interface LectureVip {
  sectionId: number
  title: string
  content: string
  duration: number
  description: string
  lectureType: LectureType
  contentPDFFile: string
}

interface ResponseMessage {
  statusCode: number
  message: string
}
