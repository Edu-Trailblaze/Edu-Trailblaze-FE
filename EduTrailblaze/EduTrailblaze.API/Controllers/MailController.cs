using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailService _mailService;

        public MailController(IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("send-mail")]
        public async Task<IActionResult> SendMail([FromForm] MailRequest request)
        {
            try
            {
                await _mailService.SendEmailAsync(request);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("confirmation-mail")]
        public async Task<IActionResult> SendConfirmationMail(string toMail, string OTP)
        {
            try
            {
                await _mailService.SendConfirmationEmailAsync(toMail, OTP);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
