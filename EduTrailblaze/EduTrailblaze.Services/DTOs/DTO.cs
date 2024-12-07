namespace EduTrailblaze.Services.DTOs
{
    public class CourseDTO
    {
        public int CourseId { get; set; }

        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public int Duration { get; set; } = 0;

        public string DifficultyLevel { get; set; }

        public string Prerequisites { get; set; }

        public decimal EstimatedCompletionTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public bool IsPublished { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}
