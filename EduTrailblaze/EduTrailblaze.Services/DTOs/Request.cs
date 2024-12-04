namespace EduTrailblaze.Services.DTOs
{
    public class GetCoursesRequest
    {
        public string? Title { get; set; }

        public decimal? MinRating { get; set; }

        public decimal? MaxRating { get; set; }

        public decimal? MinPrice { get; set; }

        public decimal? MaxPrice { get; set; }

        public bool? IsFree { get; set; }

        public DateTime? MinDuration { get; set; }

        public DateTime? MaxDuration { get; set; }

        public bool? HasQuizzes { get; set; }

        public string? DifficultyLevel { get; set; }

        public DateTime? CreatedAt { get; set; }

        public string? InstructorId { get; set; }

        public string? LanguageId { get; set; }
        
        public int? TagId { get; set; }

        public bool? IsPublished { get; set; }

        public bool? IsDeleted { get; set; }

        public Paging? Paging { get; set; }
    }
}
