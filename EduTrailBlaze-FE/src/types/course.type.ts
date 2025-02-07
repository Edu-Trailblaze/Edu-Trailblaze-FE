interface Lesson {
  lessonId: number;
  title: string;
  duration: string;
  rating: number;
  reviews: number;
  description: string;
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
  courseId: number;
  imageURL?: string;
  title: string;
  duration: number; // in hours
  price: number;
  difficultyLevel: string;
  description: string;
  createdBy: string;
  createdAt: string; // ISO 8601 string
  discount: Discount;
  review: Review;
  instructors: Instructor[];
  enrollment: Enrollment;
  lessons: Lesson[];

}
