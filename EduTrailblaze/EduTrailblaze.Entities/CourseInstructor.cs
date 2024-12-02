using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class CourseInstructor
    {
        [Key, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Key, ForeignKey("User")]
        public string InstructorId { get; set; }

        [Required]
        public bool IsPrimaryInstructor { get; set; }

        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual User Instructor { get; set; }
    }
}
