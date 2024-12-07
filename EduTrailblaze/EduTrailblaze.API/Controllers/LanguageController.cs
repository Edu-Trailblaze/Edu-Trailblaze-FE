using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageService _languageService;

        public LanguageController(ILanguageService languageService)
        {
            _languageService = languageService;
        }

        [HttpGet("{languageId}")]
        public async Task<IActionResult> GetLanguage(int languageId)
        {
            try
            {
                var language = await _languageService.GetLanguage(languageId);
                if (language == null)
                {
                    return NotFound();
                }
                return Ok(language);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddLanguage([FromBody] CreateLanguageRequest language)
        {
            try
            {
                await _languageService.AddLanguage(language);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateLanguage([FromBody] UpdateLanguageRequest language)
        {
            try
            {
                await _languageService.UpdateLanguage(language);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
