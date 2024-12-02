using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class UserNotification
    {
        [Key, ForeignKey("User")]
        public string UserId { get; set; }

        [Key, ForeignKey("Notification")]
        public int NotificationId { get; set; }

        [Required]
        public bool IsRead { get; set; } = false;


        // Navigation properties
        public virtual User User { get; set; }
        public virtual Notification Notification { get; set; }
    }
}