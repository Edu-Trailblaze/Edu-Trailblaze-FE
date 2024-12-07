using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("get-system-cart")]
        public async Task<IActionResult> GetCart(string userId)
        {
            try
            {
                var cart = await _cartService.GetUserCart(userId);
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add-item-to-system-cart")]
        public async Task<IActionResult> AddItemToCart(int courseId, string userId)
        {
            try
            {
                await _cartService.AddItemToCart(courseId, userId);
                return Ok(new { message = "Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("remove-item-from-system-cart")]
        public async Task<IActionResult> RemoveItemFromCart(int courseId, string userId)
        {
            try
            {
                await _cartService.RemoveItemFromCart(courseId, userId);
                return Ok(new { message = "Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("number-of-items-in-system-cart")]
        public async Task<IActionResult> NumberOfItemInSystemCart(string userId)
        {
            try
            {
                var numberOfItems = await _cartService.NumberOfItemInSystemCart(userId);
                return Ok(numberOfItems);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-cookie-cart")]
        public IActionResult DeleteCartInCookie(string? userId)
        {
            try
            {
                _cartService.DeleteCartInCookie(userId);
                return Ok(new { message = "Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("number-of-items-in-cookie-cart")]
        public IActionResult NumberOfItemsInCart(string? userId)
        {
            try
            {
                var numberOfItems = _cartService.NumberOfItemsInCart(userId);
                return Ok(numberOfItems);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-cookie-cart")]
        public IActionResult GetCookieCart(string? userId)
        {
            try
            {
                var cart = _cartService.GetCart(userId);
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("save-item-to-cookie-cart")]
        public async Task<IActionResult> SaveCartToCookie(int courseId, string? userId)
        {
            try
            {
                await _cartService.SaveCartToCookie(courseId, userId);
                return Ok(new { message = "Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("remove-item-from-cookie-cart")]
        public IActionResult RemoveCourseFromCart(int courseId, string? userId)
        {
            try
            {
                _cartService.RemoveCourseFromCart(courseId, userId);
                return Ok(new { message = "Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
