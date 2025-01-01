using EduTrailblaze.API.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Enrollment : EntityAuditBase<int>
    {
        

        [Required, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Required, ForeignKey("User")]
        public string StudentId { get; set; }

        public decimal ProgressPercentage { get; set; } = 0;

        public bool IsCompleted { get; set; } = false;

        


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual User Student { get; set; }
    }
}
