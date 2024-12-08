﻿using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment?> GetPayment(int paymentId);

        Task<IEnumerable<Payment>> GetPayments();

        Task AddPayment(Payment payment);

        Task UpdatePayment(Payment payment);

        Task AddPayment(CreatePaymentRequest payment);

        Task UpdatePayment(UpdatePaymentRequest payment);

        Task DeletePayment(Payment payment);
    }
}
