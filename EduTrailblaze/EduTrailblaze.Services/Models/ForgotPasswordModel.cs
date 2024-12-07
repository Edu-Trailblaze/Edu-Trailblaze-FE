using System.ComponentModel.DataAnnotations;

namespace EduTrailblaze.Services.Models
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}
