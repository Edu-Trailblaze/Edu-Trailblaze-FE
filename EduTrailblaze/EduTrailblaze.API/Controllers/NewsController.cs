using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            try
            {
                var news = await _newsService.GetNews();
                return Ok(news);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{newsId}")]
        public async Task<IActionResult> GetNews(int newsId)
        {
            try
            {
                var news = await _newsService.GetNews(newsId);

                if (news == null)
                {
                    return NotFound();
                }

                return Ok(news);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddNews([FromBody] CreateNewsRequest news)
        {
            try
            {
                await _newsService.AddNews(news);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsRequest news)
        {
            try
            {
                await _newsService.UpdateNews(news);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{newsId}")]
        public async Task<IActionResult> DeleteNews(int newsId)
        {
            try
            {
                await _newsService.DeleteNews(newsId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
