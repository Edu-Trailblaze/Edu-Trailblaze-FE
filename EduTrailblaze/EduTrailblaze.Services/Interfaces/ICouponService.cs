using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ICouponService
    {
        Task<Coupon?> GetCoupon(int couponId);

        Task<IEnumerable<Coupon>> GetCoupons();

        Task AddCoupon(Coupon coupon);

        Task UpdateCoupon(Coupon coupon);

        Task DeleteCoupon(Coupon coupon);
    }
}
