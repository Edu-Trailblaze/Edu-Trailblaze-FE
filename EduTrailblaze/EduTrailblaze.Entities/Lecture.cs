using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Lecture
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LectureId { get; set; }

        [Required, ForeignKey("Section")]
        public int SectionId { get; set; }

        [Required, StringLength(50)]
        public string Title { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string Content { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string Description { get; set; }

        [Required] 
        public int Duration { get; set; }

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        // Navigation properties
        public virtual Section Section { get; set; }
        public virtual ICollection<Quiz> Quizzes { get; set; }
        public virtual ICollection<Video> Videos { get; set; }
        public virtual ICollection<UserProgress> UserProgresses { get; set; }
    }
}
