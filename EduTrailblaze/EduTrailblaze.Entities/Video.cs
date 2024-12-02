using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Video
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VideoId { get; set; }

        [Required, ForeignKey("Lecture")]
        public int LectureId { get; set; }

        [Required, StringLength(50)]
        public string Title { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string VideoUrl { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string Transcript { get; set; }

        [Required]
        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        // Navigation properties
        public virtual Lecture Lecture { get; set; }
    }
}
