        
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Helper;
using Microsoft.AspNetCore.Identity;
using EduTrailblaze.Services.Interface;
using EduTrailblaze.Services.Models;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Http;
using System.Security.Policy;
using Microsoft.EntityFrameworkCore;
using Polly;
using Polly.Retry;
using Polly.Timeout;
using Polly.Wrap;
using Microsoft.Data.SqlClient;
using StackExchange.Redis;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.AspNetCore.Authentication;
using System.Reflection.Metadata.Ecma335;

namespace EduTrailblaze.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRedisService _redisService;
        private readonly ITokenGenerator _jwtToken;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AsyncPolicyWrap _dbPolicyWrap;
        private readonly AsyncRetryPolicy _dbRetryPolicy;
        private readonly AsyncTimeoutPolicy _dbTimeoutPolicy;
        private readonly ISendMail _sendMail;

        public AuthService(ITokenGenerator authService, UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager, IRedisService redisService, ISendMail sendMail)
        {
            _jwtToken = authService;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _dbRetryPolicy = Policy.Handle<SqlException>()
                                   .WaitAndRetryAsync(1, retryAttempt => TimeSpan.FromSeconds(Math.Pow(1, retryAttempt)),
                                   (exception, timeSpan, retryCount, context) =>
                                   {
                                       Console.WriteLine($"[Db Retry] Attempt {retryCount} after {timeSpan} due to: {exception.Message}");
                                   });
            _dbTimeoutPolicy = Policy.TimeoutAsync(10, TimeoutStrategy.Optimistic, (context, timeSpan, task) =>
            {
                Console.WriteLine($"[Db Timeout] Operation timed out after {timeSpan}");
                return Task.CompletedTask;
            });
            _dbPolicyWrap = Policy.WrapAsync(_dbRetryPolicy, _dbTimeoutPolicy);
            _redisService = redisService;
            _sendMail = sendMail;
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

        public async Task<ApiResponse> ForgotPassword(ForgotPasswordModel forgotPasswordModel)
        {
            var user = await _dbPolicyWrap.ExecuteAsync(async ()=> await _userManager.FindByEmailAsync(forgotPasswordModel.Email));
            if (user == null)
            {
                return new ApiResponse { StatusCode = StatusCodes.Status404NotFound, Message = "User not found." };
            }
            var token = await _dbPolicyWrap.ExecuteAsync(async ()=> await _userManager.GeneratePasswordResetTokenAsync(user));
            
            var resetPasswordUrl = $"https://localhost:7034/reset-password?email={user.Email}&token={token}";

            var isSendMailSuccess = await _sendMail.SendForgotEmailAsync(forgotPasswordModel.Email, "Reset Password", resetPasswordUrl);
            return (isSendMailSuccess is true) ? new ApiResponse { StatusCode = StatusCodes.Status200OK, Message = "Email sent successfully." } : new ApiResponse { StatusCode = StatusCodes.Status500InternalServerError, Message = "Error sending email." };
            
        }

        public async Task<ApiResponse> Login(LoginModel loginModel)
        {
            try
            {
                var user = await _dbPolicyWrap.ExecuteAsync(async () => await _userManager.FindByEmailAsync(loginModel.Email));
                if (user == null)
                {
                    return new ApiResponse { StatusCode = StatusCodes.Status400BadRequest, Data = "Does not have that account in the Application" };
                }

                var result = await _signInManager.PasswordSignInAsync(loginModel.Email, loginModel.Password, loginModel.RememberMe, lockoutOnFailure: true);

                if (!result.Succeeded)
                {
                    if (result.IsLockedOut) return new ApiResponse { StatusCode = StatusCodes.Status401Unauthorized, Message = "Your account is locked. Please contact support." };
                    if (result.IsNotAllowed) return new ApiResponse { StatusCode = StatusCodes.Status401Unauthorized, Message = "Your account is not allowed to login. Please contact support." };
                    if (result.RequiresTwoFactor) return new ApiResponse { StatusCode = StatusCodes.Status401Unauthorized, Message = "Your account requires two factor authentication." };
                    return new ApiResponse { StatusCode = StatusCodes.Status401Unauthorized, Data = "Invalid login attempt." };
                }
                if (await _userManager.GetTwoFactorEnabledAsync(user) is true) return new ApiResponse { StatusCode = StatusCodes.Status200OK, Data = new { QrCode = await _userManager.GetAuthenticatorKeyAsync(user) } };
                var claims = await _userManager.GetClaimsAsync(user);
                var firstNameClaim = claims.FirstOrDefault(u => u.Type == "FirstName");
                if (firstNameClaim != null)
                {
                    await _userManager.RemoveClaimAsync(user, firstNameClaim);
                }
                await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("Username", user.UserName));

                var token = await _jwtToken.GenerateJwtToken(user, "Admin");
                var refreshToken = await _jwtToken.GenerateRefreshToken();
                await _redisService.AcquireLock(user.Id, refreshToken);

                return new ApiResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Login successful.",
                    Data = new
                    {
                        AccessToken = token,
                        RefreshToken = refreshToken
                    }
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = $"Error during registration: {ex.Message}"
                };
            }
        }

        public async Task<ApiResponse> Logout(string userId)
        {
            try
            {
                var isReleaseLockSuccess = await _redisService.ReleaseLock(userId);
                if (!isReleaseLockSuccess)
                {
                    return new ApiResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "User not found"
                    };
                }

                return new ApiResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Logged out successfully"
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = $"Error during logout: {ex.Message}"
                };
            }
        }

        public Task<ApiResponse> RefreshToken(string refreshToken)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiResponse> Register(RegisterModel model)
        {
            try
            {
                var roleChecked = await _roleManager.Roles.AnyAsync(r => r.Name == model.RoleSelected);
                if (model.RoleSelected != null)
                {
                    model.RoleSelected = char.ToUpper(model.RoleSelected[0]) + model.RoleSelected.Substring(1).ToLower();
                }
                if (model.RoleSelected == null || !roleChecked)
                {
                    return new ApiResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = $"Invalid role '{model.RoleSelected}'"
                    };
                }

                if (model == null)
                {
                    return new ApiResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Invalid request."
                    };
                }

                if (model.Password != model.ConfirmPassword)
                {
                    return new ApiResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Passwords do not match."
                    };
                }

                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null && user.EmailConfirmed)
                {
                    return new ApiResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "User already exists and is confirmed"
                    };
                }

                var newUser = new User
                {
                    UserName = model.Email,
                    Email = model.Email,
                };

                var result = await _userManager.CreateAsync(newUser, model.Password);

                if (!result.Succeeded)
                {
                    return new ApiResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = $"Registration failed: {string.Join(", ", result.Errors.Select(e => e.Description))}"
                    };
                }
                await _userManager.AddToRoleAsync(newUser, model.RoleSelected);

                await _userManager.SetTwoFactorEnabledAsync(newUser, true);
                //var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                var userLogin = await _userManager.FindByEmailAsync(model.Email);

                await _userManager.ResetAuthenticatorKeyAsync(newUser);
                

                var token = await _jwtToken.GenerateJwtToken(userLogin, model.RoleSelected);
                var refreshToken = await _jwtToken.GenerateRefreshToken();

                return new ApiResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "User registered successfully.",
                    Data = new
                    {
                        AccessToken = token,
                        RefreshToken = refreshToken
                    }
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = $"Error during registration: {ex.Message}"
                };
            }
        }

        public Task RemoveAuthenticator()
        {
            throw new NotImplementedException();
        }

        public async Task<ApiResponse> ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            var user = await _dbPolicyWrap.ExecuteAsync(async () => await _userManager.FindByEmailAsync(resetPasswordModel.Email));
            if (user == null)
            {
                return new ApiResponse { StatusCode = StatusCodes.Status404NotFound, Message = "User not found." };
            }
            var result = await _dbPolicyWrap.ExecuteAsync(async () => await _userManager.ResetPasswordAsync(user,resetPasswordModel.Token, resetPasswordModel.Password));
          return (result.Succeeded) ? new ApiResponse { StatusCode = StatusCodes.Status200OK, Message = "Password reset successfully." } : new ApiResponse { StatusCode = StatusCodes.Status500InternalServerError, Message = "Error when reset password." };   
        }

        public async Task<ApiResponse> VerifyAuthenticatorCode(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ApiResponse
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "User not found."
                };
            }
            if (!await _userManager.GetTwoFactorEnabledAsync(user))
            {
                return new ApiResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Two-factor authentication is not enabled for this user."
                };
            }

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, TokenOptions.DefaultAuthenticatorProvider, code);

            if (!isValid)
            {
                return new ApiResponse { StatusCode = StatusCodes.Status401Unauthorized, Message = "Invalid 2FA code." };
            }

            var token = await _jwtToken.GenerateJwtToken(user, "Admin");
            var refreshToken = await _jwtToken.GenerateRefreshToken();
            await _redisService.AcquireLock(user.Id, refreshToken);

            return new ApiResponse
            {
                StatusCode = StatusCodes.Status200OK,
                Message = "Login successful.",
                Data = new
                {
                    AccessToken = token,
                    RefreshToken = refreshToken
                }
            };
        }
    }
}
