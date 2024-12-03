using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IRepository<Payment> _paymentRepository;

        public PaymentService(IRepository<Payment> paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public async Task<Payment?> GetPayment(int paymentId)
        {
            try
            {
                return await _paymentRepository.GetByIdAsync(paymentId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the payment.", ex);
            }
        }
        
        public async Task<IEnumerable<Payment>> GetPayments()
        {
            try
            {
                return await _paymentRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the payment.", ex);
            }
        }

        public async Task AddPayment(Payment payment)
        {
            try
            {
                await _paymentRepository.AddAsync(payment);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the payment.", ex);
            }
        }

        public async Task UpdatePayment(Payment payment)
        {
            try
            {
                await _paymentRepository.UpdateAsync(payment);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the payment.", ex);
            }
        }

        public async Task DeletePayment(Payment payment)
        {
            try
            {
                await _paymentRepository.DeleteAsync(payment);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the payment.", ex);
            }
        }
    }
}
