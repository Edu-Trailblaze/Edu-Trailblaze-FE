using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
        Task SendConfirmationEmailAsync(string toMail, string token);
        Task SendForgetPasswordEmailAsync(string toMail, string token);
    }
}
