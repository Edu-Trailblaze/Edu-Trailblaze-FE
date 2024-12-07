namespace EduTrailblaze.Services.Helper
{
    public interface ISendMail
    {
        Task<bool> SendForgotEmailAsync(string to_email, string subject, string resetPasswordUrl);
    }
}
