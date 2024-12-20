using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Review
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReviewId { get; set; }

        [Required, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Required, ForeignKey("User")]
        public string UserId { get; set; }

        [Required, Range(0, 5)]
        public decimal Rating { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string ReviewText { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public bool IsDeleted { get; set; } = false;


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual User User { get; set; }
    }
}