using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Quiz
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuizzId { get; set; }

        [Required, ForeignKey("Lecture")]
        public int LectureId { get; set; }

        [Required, StringLength(200)]
        public string Title { get; set; }

        [Required]
        public decimal PassingScore { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        // Navigation properties
        public virtual Lecture Lecture { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<QuizHistory> QuizHistories { get; set; }
        public virtual ICollection<UserProgress> UserProgresses { get; set; }
    }
}
