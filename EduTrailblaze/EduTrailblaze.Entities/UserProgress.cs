using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class UserProgress
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserProgressId { get; set; }

        [Required, ForeignKey("User")]
        public string UserId { get; set; }

        [Required, ForeignKey("Course")]
        public int CourseId { get; set; }

        [ForeignKey("Section")]
        public int? SectionId { get; set; }

        [ForeignKey("Lecture")]
        public int? LectureId { get; set; }

        [ForeignKey("Quiz")]
        public int? QuizId { get; set; }

        [Required, StringLength(50)]
        public string ProgressType { get; set; }
        //'Course', 'Section', 'Lecture', 'Quiz'

        public decimal ProgressPercentage { get; set; } = 0;

        public bool IsCompleted { get; set; } = false;

        [Required]
        public DateTime LastAccessed { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }



        // Navigation properties
        public virtual User User { get; set; }
        public virtual Course Course { get; set; }
        public virtual Section Section { get; set; }
        public virtual Lecture Lecture { get; set; }
        public virtual Quiz Quiz { get; set; }
    }
}
