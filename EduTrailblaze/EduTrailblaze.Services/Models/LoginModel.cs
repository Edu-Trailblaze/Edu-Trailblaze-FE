using System.ComponentModel.DataAnnotations;
namespace EduTrailblaze.Services.Models
{
    public class LoginModel
    {
        /// <summary>
        /// The user's email address which acts as a user name.
        /// </summary>
        [Required]
        [EmailAddress]
        public required string Email { get; init; }

        /// <summary>
        /// The user's password.
        /// </summary>
        [Required]
        [DataType(DataType.Password)]
        public required string Password { get; init; }

        /// <summary>
        /// The optional two-factor authenticator code. This may be required for users who have enabled two-factor authentication.
        /// This is not required if a <see cref="TwoFactorRecoveryCode"/> is sent.
        /// </summary>
        public string? TwoFactorCode { get; init; }

        /// <summary>
        /// An optional two-factor recovery code from <see cref="TwoFactorResponse.RecoveryCodes"/>.
        /// This is required for users who have enabled two-factor authentication but lost access to their <see cref="TwoFactorCode"/>.
        /// </summary>
        public string? TwoFactorRecoveryCode { get; init; }

        [Required]
        [Display(Name = "Rememeber me?")]
        public bool RememberMe { get; set; }
    }
}
