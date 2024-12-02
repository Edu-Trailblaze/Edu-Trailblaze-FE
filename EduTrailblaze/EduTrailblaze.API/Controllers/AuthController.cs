using EduTrailblaze.Entities;
using EduTrailblaze.Services;
using EduTrailblaze.Services.Helper;
using EduTrailblaze.Services.Interface;
using EduTrailblaze.Services.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TokenGenerator _jwtToken;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IAuthService _authService;

        public AuthController(TokenGenerator tokenGenerator, UserManager<User> userManager, SignInManager<User> signInManager, IAuthService authService)
        {
            _jwtToken = tokenGenerator;
            _userManager = userManager;
            _signInManager = signInManager;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            //if (model == null)
            //{
            //    return BadRequest(new { Message = "Invalid request." });
            //}

            //if (model.Password != model.ConfirmPassword)
            //{
            //    return BadRequest(new { Message = "Passwords do not match." });
            //}

            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
               // Name = model.Name,
               // DateCreated = DateTime.Now
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) return BadRequest(new { Message = "Registration failed.", Errors = result.Errors });

            if (model.RoleSelected == null)
            {
               // await _userManager.AddToRoleAsync(user, SD.User);
            }
            else
            {
                await _userManager.AddToRoleAsync(user, model.RoleSelected);
            }
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackurl = Url.Action("ConfirmEmail", "Account", new
            {
                userid = user.Id,
                code
            }, protocol: HttpContext.Request.Scheme);
            //await _emailSender.SendEmailAsync(model.Email, "Confirm Email - Identity Manager",
            //                               $"Please confirm your email by clicking here: <a href='{callbackurl}'>link</a>");

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(new { Message = "User registered successfully." });


        }

        [HttpPost("login")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody]  LoginModel model)
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
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: true);
                
                if (!result.Succeeded)
                {
                    if (result.IsLockedOut) return StatusCode(statusCode:401,new { Message = "Your account is locked. Please contact support." });
                    return StatusCode(statusCode: 400, new { Message = "Your account is locked. Please contact support." });

                }
                var user = await _userManager.FindByEmailAsync(model.Email);
             var token =   await _jwtToken.GenerateJwtToken(user,"Admin");
                return Ok(new { message = "Login successful." , Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
