using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{

    public class UserProfile
    {
        [Key, ForeignKey("User")]
        public string UserId { get; set; } // Primary and Foreign Key

        public string Address { get; set; }

        public decimal Balance { get; set; } = 0;

        [StringLength(int.MaxValue)]
        public string ProfilePictureUrl { get; set; }


        // Navigation property
        public virtual User User { get; set; }
    }
}
