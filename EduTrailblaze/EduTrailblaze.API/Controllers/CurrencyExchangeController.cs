using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EduTrailblaze.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyExchangeController : ControllerBase
    {
        private readonly ICurrencyExchangeService _currencyExchangeService;

        public CurrencyExchangeController(ICurrencyExchangeService currencyExchangeService)
        {
            _currencyExchangeService = currencyExchangeService;
        }

        [HttpGet("convert")]
        public async Task<IActionResult> ConvertCurrency(string from, string to, decimal amount)
        {
            try
            {
                decimal rate = await _currencyExchangeService.GetExchangeRateAsync(from, to);
                decimal convertedAmount = amount * rate;
                return Ok(new { from, to, amount, convertedAmount, rate });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}