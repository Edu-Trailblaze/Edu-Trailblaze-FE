using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService _discountService;

        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [HttpGet("{discountId}")]
        public async Task<IActionResult> GetDiscount(int discountId)
        {
            try
            {
                var discount = await _discountService.GetDiscount(discountId);
                if (discount == null)
                {
                    return NotFound();
                }
                return Ok(discount);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddDiscount([FromBody] CreateDiscountRequest discount)
        {
            try
            {
                await _discountService.AddDiscount(discount);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateDiscount([FromBody] UpdateDiscountRequest discount)
        {
            try
            {
                await _discountService.UpdateDiscount(discount);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
