using EduTrailblaze.Entities;
using EduTrailblaze.Services.Helper;
using Microsoft.AspNetCore.Identity;
using EduTrailblaze.Services.Interface;
using EduTrailblaze.Services.Models;
using Microsoft.Identity.Client;

namespace EduTrailblaze.Services
{
    public class AuthService : IAuthService
    {
        private readonly TokenGenerator _jwtToken;
        private readonly UserManager<User> _userManager;
        public AuthService(TokenGenerator authService, UserManager<User> userManager)
        {
            _jwtToken = authService;
            _userManager = userManager;
        }

        public Task EnableAuthenticator(TwoFactorAuthenticationModel twoFactorAuthenticationViewModel)
        {
            throw new NotImplementedException();
        }

        public Task ExternalLoginCallback()
        {
            throw new NotImplementedException();
        }

        public Task ExternalLoginCallback(AuthenticationResult authenticationResult)
        {
            throw new NotImplementedException();
        }

        public Task ForgotPassword(ForgotPasswordModel forgotPasswordModel)
        {
            throw new NotImplementedException();
        }

        public async Task Login(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task Register(string email, string password)
        {
            throw new NotImplementedException();
        }

        public Task RemoveAuthenticator()
        {
            throw new NotImplementedException();
        }

        public Task ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            throw new NotImplementedException();
        }

        public Task VerifyAuthenticatorCode(string email, string code)
        {
            throw new NotImplementedException();
        }

       
    }
}
