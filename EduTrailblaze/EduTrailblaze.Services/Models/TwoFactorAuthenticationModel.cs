using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduTrailblaze.Services.Models
{
    public class TwoFactorAuthenticationModel
    {
        public string Code { get; set; }
        public string UserId { get; set; }
    }
}
