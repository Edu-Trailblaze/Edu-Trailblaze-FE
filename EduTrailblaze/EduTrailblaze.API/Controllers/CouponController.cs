using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private readonly ICouponService _couponService;

        public CouponController(ICouponService couponService)
        {
            _couponService = couponService;
        }

        [HttpGet("{couponId}")]
        public async Task<IActionResult> GetCoupon(int couponId)
        {
            try
            {
                var coupon = await _couponService.GetCoupon(couponId);
                return Ok(coupon);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddCoupon([FromBody] CreateCouponRequest coupon)
        {
            try
            {
                await _couponService.AddCoupon(coupon);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCoupon([FromBody] UpdateCouponRequest coupon)
        {
            try
            {
                await _couponService.UpdateCoupon(coupon);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("apply-coupon")]
        public async Task<IActionResult> ApplyCoupon([FromBody] ApplyCouponRequest applyCouponRequest)
        {
            try
            {
                await _couponService.ApplyCoupon(applyCouponRequest.CouponCode, applyCouponRequest.UserId, applyCouponRequest.CourseId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        
        [HttpPost("remove-coupon")]
        public async Task<IActionResult> RemoveCoupon([FromBody] RemoveCouponRequest removeCouponRequest)
        {
            try
            {
                await _couponService.RemoveCoupon(removeCouponRequest.CouponCode, removeCouponRequest.UserId, removeCouponRequest.CourseId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
