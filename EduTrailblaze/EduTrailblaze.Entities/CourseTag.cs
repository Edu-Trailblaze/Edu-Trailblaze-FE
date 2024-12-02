using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduTrailblaze.Entities
{
    public class CourseTag
    {
        [Key, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Key, ForeignKey("Tag")]
        public int TagId { get; set; }


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
