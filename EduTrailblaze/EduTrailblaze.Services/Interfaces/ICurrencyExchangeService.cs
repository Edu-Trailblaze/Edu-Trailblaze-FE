namespace EduTrailblaze.Services.Interfaces
{
    public interface ICurrencyExchangeService
    {
        Task<decimal> GetExchangeRateAsync(string fromCurrency, string toCurrency);
    }
}
