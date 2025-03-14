interface SectionLecture {
  sectionId: number
  lectures: ILecture[]
}

interface ILecture {
  sectionId: number
  title: string
  content: string
  duration: number
  description: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  id: number
  lectureType: LectureType
}

interface EditLecture {
  lectureId: number
  sectionId: number
  lectureType: string
  title: string
  content: string
  description: string
  duration: number
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
  contentFile: File | null
}

interface ResponseMessage {
  statusCode: number
  message: string
}

interface EditSection {
  sectionId: number
  title: string
  description: string
}