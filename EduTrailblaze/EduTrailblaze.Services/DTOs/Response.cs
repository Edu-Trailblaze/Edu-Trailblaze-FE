namespace EduTrailblaze.Services.DTOs
{
    public class CoursesResponse
    {
        public int CourseId { get; set; }

        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int Duration { get; set; }

        public string DifficultyLevel { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }
    }

    public class DiscountInformation
    {
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal PriceAfterDiscount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class CourseReviewInformation
    {
        public decimal AverageRating { get; set; }
        public int TotalRatings { get; set; }
    }

    public class InstructorInformation
    {
        public string UserName { get; set; }
        public string Email { get; set; }
    }

    public class EnrollmentInformation
    {
        public int TotalEnrollments { get; set; }
    }

    public class CourseCardResponse
    {
        public CoursesResponse Course { get; set; }
        public DiscountInformation? Discount { get; set; }
        public CourseReviewInformation Review { get; set; }
        public List<InstructorInformation> Instructors { get; set; }
        public EnrollmentInformation Enrollment { get; set; }
    }
}
