using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment?> GetPayment(int paymentId);

        Task<IEnumerable<Payment>> GetPayments();

        Task AddPayment(Payment payment);

        Task UpdatePayment(Payment payment);

        Task DeletePayment(Payment payment);
    }
}
