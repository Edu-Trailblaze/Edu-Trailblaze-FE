interface ICourseProps {
  courseId: number; 
}
interface Lesson {
  lessonId: number;
  title: string;
  duration: string;
  rating: number;
  reviews: number;
  description: string;
}

interface Section {
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
  lessons: Lesson[];
}

interface ICourseDetails {
  courseDetails: {
    courseId: number
    imageURL?: string
    title: string
    duration: number
    price: number
    difficultyLevel: string
    description: string
    createdBy: string
    createdAt: string
    discount: Discount
    review: Review
    instructors: Instructor[]
    enrollment: Enrollment
    lessons: Lesson[]
    languages: string[]
    introURL: string
    learningOutcomes: string[]
    skills: string[]
    estimatedCompletionTime: number
    updatedAt: string
  }
}

interface ICourseFull {
  courseDetails: {
    courseId: number
    imageURL?: string
    title: string
    duration: number
    price: number
    difficultyLevel: string
    description: string
    createdBy: string
    createdAt: string
    discount: Discount
    review: Review
    instructors: Instructor[]
    enrollment: Enrollment
    lessons: Lesson[]
    languages: string[]
    introURL: string
    learningOutcomes: string[]
    skills: string[]
    estimatedCompletionTime: number
    updatedAt: string
  }
  sectionDetails: Section[]
}