interface ILecture {
  sectionId: number;
  title: string;
  content: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
}

interface ISection {
  courseId: number
  title: string
  description: string
  numberOfLectures: number
  duration: string
}

interface Instructor {
  userName: string;
  email: string;
  image: string;
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
  courseDetails: {}
  courseId: number;
  imageURL?: string;
  title: string;
  duration: number;
  price: number;
  difficultyLevel: string;
  description: string;
  createdBy: string;
  createdAt: string;
  discount: Discount;
  review: Review;
  instructors: Instructor[];
  enrollment: Enrollment;
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
    courseId: number
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