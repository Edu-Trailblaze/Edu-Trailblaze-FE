using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IMoMoService
    {
        Task<PaymentResponse> ValidatePaymentResponse(string queryString);
        Task<string> CreatePaymentUrl(decimal amount, int orderId, int paymentId);
    }
}
