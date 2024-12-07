using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private readonly ICertificateService _certificateService;

        public CertificateController(ICertificateService certificateService)
        {
            _certificateService = certificateService;
        }

        [HttpGet("{certificateId}")]
        public async Task<IActionResult> GetCertificate(int certificateId)
        {
            try
            {
                var certificate = await _certificateService.GetCertificate(certificateId);
                return Ok(certificate);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddCertificate([FromBody] CreateCertificateRequest certificate)
        {
            try
            {
                await _certificateService.AddCertificate(certificate);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCertificate([FromBody] UpdateCertificateRequest certificate)
        {
            try
            {
                await _certificateService.UpdateCertificate(certificate);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
