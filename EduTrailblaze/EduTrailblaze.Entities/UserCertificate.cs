using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class UserCertificate
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserCertificateId { get; set; }

        [Required, ForeignKey("User")]
        public string UserId { get; set; }

        [Required, ForeignKey("Certificate")]
        public int CertificateId { get; set; }

        public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string CertificateUrl { get; set; }


        // Navigation properties
        public virtual User User { get; set; }
        public virtual Certificate Certificate { get; set; }
    }
}
