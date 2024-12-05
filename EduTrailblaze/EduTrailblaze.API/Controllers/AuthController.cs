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
using StackExchange.Redis;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TokenGenerator _jwtToken;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<AuthController> _logger;
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
            var result = await _authService.Register(model);

            if (result.StatusCode == 200)
            {
                return Ok(new { Message = result });
                
            }
            return StatusCode(result.StatusCode, result); 

        }

        [HttpPost("login")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody]  LoginModel model)
        {
            var result = await _authService.Login(model);

            if (result.StatusCode == 200)
            {
                return Ok(new { Message = result });
            }
            return StatusCode(result.StatusCode, result);

        }

        [HttpPost("logout")]
        
        public async Task<IActionResult> Logout(string userId)
        {
          //  var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { Message = "User not found" });
            }

            var result = await _authService.Logout(userId);

            if (result.StatusCode == 200)
            {
                return Ok(new { Message = result });
            }
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            
            var user = await _userManager.GetUserAsync(User);
            var id = user.Id;
            var refreshToken =  Request.Cookies["refreshToken"];
            if (refreshToken == null)
            {
                return BadRequest(new { Message = "Refresh token is required" });
            }

            var result = await _authService.RefreshToken(refreshToken);

            if (result.StatusCode == 200)
            {
                return Ok(new { Message = result });
            }
            return StatusCode(result.StatusCode, result);
        }
    }
}
