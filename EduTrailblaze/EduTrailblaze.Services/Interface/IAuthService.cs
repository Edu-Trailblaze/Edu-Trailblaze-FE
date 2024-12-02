using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EduTrailblaze.Services.Models;
using Microsoft.Identity.Client;

namespace EduTrailblaze.Services.Interface
{
    public interface IAuthService
    {
        Task Register(string email, string password);
        Task Login(string email, string password);
        Task VerifyAuthenticatorCode(string email, string code);
        Task RemoveAuthenticator();
        Task ForgotPassword(ForgotPasswordModel forgotPasswordModel);
        Task ResetPassword(ResetPasswordModel resetPasswordModel);

        Task EnableAuthenticator(TwoFactorAuthenticationModel twoFactorAuthenticationViewModel);
        Task ExternalLoginCallback(AuthenticationResult authenticationResult);
    }
}
