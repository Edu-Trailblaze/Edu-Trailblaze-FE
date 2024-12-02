using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Certificate
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CertificateId { get; set; }

        [Required, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string CertificateTemplateUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual ICollection<UserCertificate> UserCertificates { get; set; }
    }
}
