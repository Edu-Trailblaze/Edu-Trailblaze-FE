using EduTrailblaze.API.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Tag : EntityAuditBase<int> 
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TagId { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [StringLength(200)]
        public string Description { get; set; }


        // Navigation property
        public virtual ICollection<CourseTag> CourseTags { get; set; }
    }
}
