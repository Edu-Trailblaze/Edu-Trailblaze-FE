using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IDiscountService
    {
        Task<Discount?> GetDiscount(int discountId);

        Task<IEnumerable<Discount>> GetDiscounts();

        Task AddDiscount(Discount discount);

        Task UpdateDiscount(Discount discount);

        Task DeleteDiscount(Discount discount);

        Task AddDiscount(CreateDiscountRequest discount);

        Task UpdateDiscount(UpdateDiscountRequest discount);
    }
}
