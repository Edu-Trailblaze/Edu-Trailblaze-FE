using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EduTrailblaze.Services.DTOs
{
    public class GetCoursesResponse
    {
        public int CourseId { get; set; }

        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public decimal? DiscountPrice { get; set; }

        public int Duration { get; set; }

        public string DifficultyLevel { get; set; }

        public string CreatedBy { get; set; }
    }

    public class CourseReviewResponse
    {
        public decimal AverageRating { get; set; }
        public int TotalRatings { get; set; }
    }
}
