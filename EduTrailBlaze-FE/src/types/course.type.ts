interface ILecture {
  sectionId: number | null;
  title: string;
  content: string;
  duration: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
}

interface SectionLecture {
  sectionId: number;
  lectures: ILecture[];
}

interface ISection {
  courseId: number
  title: string
  description: string
  numberOfLectures: number
  duration: string
  id: number
}

interface Instructor {
  instructorId: string;
  courseId: number[];
  profilePictureUrl: string;
  userName: string;
  email: string;
  image: string;
  isPrimaryInstructor: boolean;
  createdAt: string;

}

interface Discount {
  discountType: string;
  discountValue: number;
  calculatedDiscount: number;
  calculatedPrice: number;
}

interface Review {
  averageRating: number;
  totalRatings: number;
}

interface Enrollment {
  totalEnrollments: number;
}

interface ICourse {
  id: number;
  title: string;
  imageURL: string;
  introURL: string;
  description: string;
  price: number;
  duration: number;
  difficultyLevel: string;
  prerequisites: string;
  learningOutcomes: string[];
  estimatedCompletionTime: number;
  createdBy: string;
  updatedBy: string;
  isPublished: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}


interface ICourseSuggestions {
  title: string;
  imageURL: string;
  introURL: string;
  description: string;
  price: number;
  duration: number;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced"; 
  prerequisites: string;
  learningOutcomes: string[];
  estimatedCompletionTime: number;
  createdBy: string;
  updatedBy: string;
  isPublished: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
}

interface ICourseDetails {
    id: number
    title: string
    review: Review
    enrollment: Enrollment
    instructors: Instructor[]
    languages: string[]
    imageURL: string
    introURL: string
    description: string
    price: number
    duration: number
    difficultyLevel: string
    learningOutcomes: string[]
    createdAt: string
    skills: string[]
    estimatedCompletionTime: number
    updatedAt: string
}

interface ICourseFull {
  courseDetails: ICourseDetails
  sectionDetails: ISection[]
}

interface ICourseInstructor {
  id: string
  userName: string
  email: string
}