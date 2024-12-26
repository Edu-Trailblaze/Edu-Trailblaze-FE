using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Json;

namespace EduTrailblaze.Services
{
    public class CurrencyExchangeService : ICurrencyExchangeService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _baseUrl;

        public CurrencyExchangeService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["ExchangeRateApi:ApiKey"];
            _baseUrl = configuration["ExchangeRateApi:BaseUrl"];
        }

        public async Task<decimal> GetExchangeRateAsync(string fromCurrency, string toCurrency)
        {
            var url = $"{_baseUrl}/latest.json?app_id={_apiKey}";
            var response = await _httpClient.GetFromJsonAsync<ExchangeRateResponse>(url);

            if (response == null || response.Rates == null)
                throw new Exception("Failed to fetch exchange rates");

            if (!response.Rates.ContainsKey(fromCurrency) || !response.Rates.ContainsKey(toCurrency))
                throw new Exception($"Invalid currency codes: {fromCurrency}, {toCurrency}");

            decimal fromRate = response.Rates[fromCurrency];
            decimal toRate = response.Rates[toCurrency];
            return toRate / fromRate;
        }
    }
}
