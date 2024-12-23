using EduTrailblaze.Services.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace EduTrailblaze.Services.Helper
{
    public class SendMail : ISendMail
    {
        private readonly EmailConfig _emailConfig;
        private readonly ISendGridClient _sendGridClient;

        public SendMail(ISendGridClient sendGridClient, IConfiguration configuration, IOptions<EmailConfig> emailConfig)
        {
            _emailConfig = emailConfig.Value;
            _sendGridClient = sendGridClient;
        }

        public async Task<bool> SendForgotEmailAsync(string to_email, string subject, string resetPasswordUrl)
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "ForgetPassword.html");
            string mailText;
            using (var str = new StreamReader(filePath))
            {
                mailText = await str.ReadToEndAsync();
            }
            mailText = mailText.Replace("{resetPasswordUrl}", resetPasswordUrl);
            var from_email = new EmailAddress(_emailConfig.FromEmail);
            var msg = SendGrid.Helpers.Mail.MailHelper.CreateSingleEmail(from_email, new EmailAddress(to_email), subject, "", mailText);
            var response = await _sendGridClient.SendEmailAsync(msg).ConfigureAwait(false);
            if (response.IsSuccessStatusCode) return true;
            return false;
        }
    }
}
