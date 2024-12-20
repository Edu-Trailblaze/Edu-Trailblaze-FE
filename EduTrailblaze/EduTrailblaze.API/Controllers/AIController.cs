using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIController : ControllerBase
    {
        private readonly IAIService _aiService;

        public AIController(IAIService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("local-text-ai")]
        public async Task<IActionResult> GetResponseAsyncUsingLocalTextGenerationAI([FromBody] string userMessage)
        {
            try
            {
                var suggestion = await _aiService.GetResponseAsyncUsingLocalTextGenerationAI(userMessage);
                return Ok(suggestion);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("local-image-ai")]
        public async Task<IActionResult> GetResponseAsyncUsingLocalImageGenerationAI(GetResponseAsyncUsingLocalImageGenerationAIRequest request)
        {
            try
            {
                // Call the AI service to get the base64-encoded image
                var base64Image = await _aiService.GetResponseAsyncUsingLocalImageGenerationAI(request);

                // Check if we got a valid image
                if (string.IsNullOrEmpty(base64Image) || !IsValidBase64(base64Image))
                {
                    return BadRequest("Failed to generate the image or received invalid base64 data.");
                }

                // Decode the base64 string into byte array
                var imageBytes = Convert.FromBase64String(base64Image);

                // Return the image as a FileResult (image/png in this case)
                return File(imageBytes, "image/png");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("local-text-ai-with-config")]
        public async Task<IActionResult> GetResponseAsyncUsingLocalTextGenerationAIWithConfig([FromQuery] GetResponseAsyncUsingTextGenerationAIRequest request)
        {
            try
            {
                var res = await _aiService.GetResponseAsyncUsingLocalTextGenerationAIWithConfig(request);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("google-ai")]
        public async Task<IActionResult> GetResponseAsyncUsingGooleAI([FromQuery] GoogleChatRequest request)
        {
            try
            {
                var res = await _aiService.GetResponseAsyncUsingGoogleAI(request);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("google-ai-db")]
        public async Task<IActionResult> GetResponseAsyncUsingGoogleAIAndDb([FromQuery] GoogleChatRequest request)
        {
            try
            {
                var res = await _aiService.GetResponseAsyncUsingGoogleAIAndDb(request);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("generate-transcript")]
        public async Task<IActionResult> GenerateTranscript([FromQuery] WhisperChatRequest request)
        {
            try
            {
                var res = await _aiService.GenerateTranscriptUsingWhisper(request);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private bool IsValidBase64(string base64)
        {
            try
            {
                Convert.FromBase64String(base64);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
