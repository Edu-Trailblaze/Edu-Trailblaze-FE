using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    [Index(nameof(TagId), nameof(CourseId), IsUnique = true)]
    public class CourseTag
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourseTagId { get; set; }

        [ForeignKey("Course")]
        public int CourseId { get; set; }

        [ForeignKey("Tag")]
        public int TagId { get; set; }


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
