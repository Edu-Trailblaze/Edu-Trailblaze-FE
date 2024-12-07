using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace EduTrailblaze.Services.Models
{
    public class RegisterModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        //không chắc đúng
        public IEnumerable<IdentityRole>? RoleList { get; set; }
        [Display(Name = "Role")]
        public string RoleSelected { get; set; }


    }
}
