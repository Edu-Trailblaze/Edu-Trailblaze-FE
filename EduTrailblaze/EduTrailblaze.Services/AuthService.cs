using EduTrailblaze.Entities;
using EduTrailblaze.Services.Helper;
using Microsoft.AspNetCore.Identity;
using EduTrailblaze.Services.Interface;
using EduTrailblaze.Services.Models;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Http;
using System.Security.Policy;
using Microsoft.EntityFrameworkCore;
using System.Resources;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Polly;
using Polly.Retry;
using Polly.Timeout;
using Polly.Wrap;
using Microsoft.Data.SqlClient;

namespace EduTrailblaze.Services
{
    public class AuthService : IAuthService
    {
        private readonly ITokenGenerator _jwtToken;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AsyncPolicyWrap _dbPolicyWrap;
        private readonly AsyncRetryPolicy _dbRetryPolicy;
        private readonly AsyncTimeoutPolicy _dbTimeoutPolicy;
        public AuthService(ITokenGenerator authService, UserManager<User> userManager,SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _jwtToken = authService;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _dbRetryPolicy = Policy.Handle<SqlException>()
                               .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
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

        public async Task<ApiResponse> Login(LoginModel loginModel)
        {
            try
            {
                //var user = await _userManager.FindByNameAsync(model.Email);

                //if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                //{
                //    return
                //}

                //var token = await _jwtToken.GenerateJwtToken(user,"Admin");
                //return Ok(new { Token = token });
                var user = await _dbPolicyWrap.ExecuteAsync(async () => await _userManager.FindByEmailAsync(loginModel.Email));
                if (user == null)
                {
                    return new ApiResponse { StatusCode = StatusCodes.Status400BadRequest, Data = "Does not have that account in the Application" };
                }

                var result = await _signInManager.PasswordSignInAsync(loginModel.Email, loginModel.Password, loginModel.RememberMe, lockoutOnFailure: true);

                if (!result.Succeeded)
                {
                    if (result.IsLockedOut) return new ApiResponse { StatusCode = StatusCodes.Status401Unauthorized, Data = "Your account is locked. Please contact support." };
                }
                
               
                var claim = await _userManager.GetClaimsAsync(user);

                if (claim.Count > 0)
                {
                    await _userManager.RemoveClaimAsync(user, claim.FirstOrDefault(u => u.Type == "FirstName"));
                }
                await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("FirstName", user.UserName));
                
                var token = await _jwtToken.GenerateJwtToken(user, "Admin");
                var refreshToken = await _jwtToken.GenerateRefreshToken(); 
                return new ApiResponse { StatusCode = StatusCodes.Status200OK,
                    Message = "Login successful.", Data = new {
                        AccessToken = token,
                        RefreshToken = refreshToken
                    } };


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
       
        public async Task<ApiResponse> Register(RegisterModel model)
        {
            try
            {   
                var allRoles = await _roleManager.Roles.Select(r => r.Name).ToListAsync();
                if (model.RoleSelected != null)
                {
                    model.RoleSelected = char.ToUpper(model.RoleSelected[0]) + model.RoleSelected.Substring(1).ToLower();
                }
                if (model.RoleSelected == null || !allRoles.Contains(model.RoleSelected))
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
                    // Name = model.Name, // Uncomment if needed
                    // DateCreated = DateTime.Now // Uncomment if needed
                };

                var result = await _userManager.CreateAsync(newUser, model.Password);

                if (!result.Succeeded)
                {
                    // Return detailed errors if registration fails
                    return new ApiResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = $"Registration failed: {string.Join(", ", result.Errors.Select(e => e.Description))}"
                    };
                   
                }
                 await _userManager.AddToRoleAsync(newUser, model.RoleSelected);
                
                if (model.RoleSelected == null)
                {
                    // Uncomment if you want to set a default role
                    // await _userManager.AddToRoleAsync(newUser, "User");
                }

                var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                // var callbackurl = Url.Action("ConfirmEmail", "Account", new { userid = newUser.Id, code }, protocol: HttpContext.Request.Scheme);
                // await _emailSender.SendEmailAsync(model.Email, "Confirm Email - Identity Manager", $"Please confirm your email by clicking here: <a href='{callbackurl}'>link</a>");

                // Sign-in user
                var userLogin = await _userManager.FindByEmailAsync(model.Email);

                // Reset and get authenticator key if needed
                await _userManager.ResetAuthenticatorKeyAsync(newUser);
                await _userManager.GetAuthenticatorKeyAsync(newUser);

                // Generate Tokens
                var token = await _jwtToken.GenerateJwtToken(userLogin, model.RoleSelected);  // Giả sử bạn có service JWT để tạo token
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
                //_logger.LogError(ex, "Error during registration.");
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
