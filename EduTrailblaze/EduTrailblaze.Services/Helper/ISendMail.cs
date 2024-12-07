using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduTrailblaze.Services.Helper
{
    public interface ISendMail
    {
        Task<bool> SendForgotEmailAsync(string to_email, string subject, string resetPasswordUrl);
    }
}
