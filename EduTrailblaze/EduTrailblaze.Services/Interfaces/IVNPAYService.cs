using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IVNPAYService
    {
        string CreatePaymentUrl(decimal amount, int orderId, int paymentId);
        Task<PaymentResponse> ValidatePaymentResponse(string queryString);
    }
}
