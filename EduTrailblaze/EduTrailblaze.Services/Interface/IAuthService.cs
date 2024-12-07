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
        Task<ApiResponse> Register(RegisterModel registerModel);
        Task<ApiResponse> Login(LoginModel loginModel);
        Task<ApiResponse> VerifyAuthenticatorCode(string userId, string code);
        Task RemoveAuthenticator();
        Task<ApiResponse> ForgotPassword(ForgotPasswordModel forgotPasswordModel);
        Task<ApiResponse> ResetPassword(ResetPasswordModel resetPasswordModel);

        Task EnableAuthenticator(TwoFactorAuthenticationModel twoFactorAuthenticationViewModel);
        Task ExternalLoginCallback(AuthenticationResult authenticationResult);
        Task<ApiResponse> Logout(string userId);
        Task<ApiResponse> RefreshToken(string refreshToken);
    }
}
