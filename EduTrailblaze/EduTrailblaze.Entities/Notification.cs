using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Notification
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NotificationId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string Message { get; set; }

        [Required]
        public bool IsGlobal { get; set; }

        [Required]
        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }


        // Navigation properties
        public virtual ICollection<UserNotification> UserNotifications { get; set; }
    }
}
