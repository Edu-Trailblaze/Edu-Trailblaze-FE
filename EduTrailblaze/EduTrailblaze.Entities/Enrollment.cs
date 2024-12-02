using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduTrailblaze.Entities
{
    public class Enrollment
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnrollmentId { get; set; }

        [Required, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Required, ForeignKey("User")]
        public string StudentId { get; set; }

        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

        public decimal ProgressPercentage { get; set; } = 0;

        public bool IsCompleted { get; set; } = false;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual User Student { get; set; }
    }
}
