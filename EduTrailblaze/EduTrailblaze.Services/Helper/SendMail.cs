using SendGrid;
using SendGrid.Helpers.Mail;

namespace EduTrailblaze.Services.Helper
{
    public class SendMail : ISendMail
    {
        private readonly ISendGridClient _sendGridClient;

        public SendMail(ISendGridClient sendGridClient)
        {
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
            var from_email = new EmailAddress("halinh150@gmail.com");
            var msg = SendGrid.Helpers.Mail.MailHelper.CreateSingleEmail(from_email, new EmailAddress(to_email), subject, "", mailText);
            var response = await _sendGridClient.SendEmailAsync(msg).ConfigureAwait(false);
            if (response.IsSuccessStatusCode) return true;
            return false;
        }
    }
}
