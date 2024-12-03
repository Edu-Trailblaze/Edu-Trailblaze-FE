using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IDiscountService
    {
        Task<Discount?> GetDiscount(int dscountId);

        Task<IEnumerable<Discount>> GetDiscounts();

        Task AddDiscount(Discount dscount);

        Task UpdateDiscount(Discount dscount);

        Task DeleteDiscount(Discount dscount);
    }
}
